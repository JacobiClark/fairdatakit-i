/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import Store from 'electron-store';
import log from 'electron-log';
import fs from 'fs';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import expressServer from './server';
import {
  userConfig,
  setDefaultTestDatasetPath,
  getDefaultTestDatasetPath,
} from '../stores/userConfig';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

// Create the fairdatakit folder in the user's app data folder
const userDataPath = app.getPath('userData');
const fairdatakitSavePath = path.join(userDataPath, 'fairdatakit');
if (!fs.existsSync(fairdatakitSavePath)) {
  fs.mkdirSync(fairdatakitSavePath);
}
const fairdatakitConfigPath = path.join(fairdatakitSavePath, 'config.json');
if (!fs.existsSync(fairdatakitConfigPath)) {
  fs.writeFileSync(fairdatakitConfigPath, JSON.stringify({}));
}
// Create a folder called schemas in the fairdatakit folder if it doesn't exist
const fairDataKitSchemasPath = path.join(fairdatakitSavePath, 'schemas');
if (!fs.existsSync(fairDataKitSchemasPath)) {
  fs.mkdirSync(fairDataKitSchemasPath);
}

const fairDataKitDatasetsPath = path.join(fairdatakitSavePath, 'datasets');
if (!fs.existsSync(fairDataKitDatasetsPath)) {
  fs.mkdirSync(fairDataKitDatasetsPath);
}

const createNode = (relativePath, name, path, children) => {
  return {
    relativePath,
    name,
    path,
    children,
  };
};

const createTree = (relativePath, folderPath) => {
  const folder = fs.readdirSync(folderPath);
  const children = folder.map((child) => {
    const childPath = path.join(folderPath, child);
    // If the child is a folder, recursively create a tree for it
    if (fs.lstatSync(childPath).isDirectory()) {
      // Get the name of the child folder
      const childFolderName = path.basename(childPath);
      const childFolderVirtualPath = `${relativePath}/${childFolderName}`;
      return createTree(childFolderVirtualPath, childPath);
    }

    // If the child is a file, create a node for it
    // Get the name of the child file
    const childFileName = path.basename(childPath);
    const childFileVirtualPath = `${relativePath}/${childFileName}`;
    return createNode(childFileVirtualPath, child, childPath, []);
  });

  return createNode(
    relativePath,
    path.basename(folderPath),
    folderPath,
    children
  );
};

const generateTreeStructure = (folderPath) => {
  const baseFolderName = path.basename(folderPath);
  return [createTree(`${baseFolderName}`, folderPath)];
};

ipcMain.on('get-test-dataset-save-path', async (event) => {
  const testDatasetSavePath = userConfig.get('testDatasetSavePath');
  event.reply('get-test-dataset-save-path', testDatasetSavePath);
});

ipcMain.on('open-folder-dialog', async (event, args) => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  const tree = generateTreeStructure(result.filePaths[0]);
  console.log('tree', JSON.stringify(tree, null, 2));
  event.reply('open-folder-dialog', tree);
});

ipcMain.on(
  'open-single-folder-select-test-dataset-save-path',
  async (event) => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    setDefaultTestDatasetPath(result.filePaths[0]);
    event.reply(
      `open-single-folder-select-test-dataset-save-path`,
      result.filePaths[0]
    );
  }
);

ipcMain.on('get-test-dataset-save-path', async (event) => {
  const testDaasetPath = getDefaultTestDatasetPath();
  event.reply('get-test-dataset-save-path', testDaasetPath);
});

ipcMain.handle('show-open-dialog', async (event, options) => {
  const result = await dialog.showOpenDialog(options);
  return result;
});

const DatasetStore = new Store({
  cwd: fairDataKitDatasetsPath,
  name: 'datasets',
});
ipcMain.on('get-datasets', async (event) => {
  const datasets = DatasetStore.store;
  event.reply('get-datasets', datasets);
});
ipcMain.on('add-dataset', async (event, args) => {
  const { datasetName } = args;
  const { datasetPath } = args;
  DatasetStore.set(datasetName, {
    name: datasetName,
    path: datasetPath,
  });
  const datasets = DatasetStore.store;
  event.reply('get-datasets', datasets);
});
ipcMain.on('delete-dataset', async (event, datasetName) => {
  DatasetStore.delete(datasetName);
  const datasets = DatasetStore.store;
  event.reply('get-datasets', datasets);
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };
  // show: false,
  // width: 1024, DEFAULTS (NO X OR Y)
  // height: 728,
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    x: 1800,
    y: 0,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  // start the server
  expressServer.listen(3000, () => {
    console.log('server started at http://localhost:3000');
  });

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
