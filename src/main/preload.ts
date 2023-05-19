// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */

import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

// Define the type for IPC channels
export type Channels =
  | 'ipc-example'
  | 'get-dataset-names'
  | 'show-open-dialog'
  | 'ping-pong';

// Create an object that exposes IPC-related functionality
const electronHandler = {
  ipcRenderer: {
    // Method for sending IPC messages
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },

    // Method for registering an event listener for IPC messages
    on(channel: Channels, func: (...args: unknown[]) => void) {
      // Define the subscription callback function
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);

      // Register the event listener
      ipcRenderer.on(channel, subscription);

      // Return a cleanup function that removes the event listener
      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },

    // Method for registering a one-time event listener for IPC messages
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

// Expose the electronHandler object to the window context
contextBridge.exposeInMainWorld('electron', electronHandler);

// Define the type for the electronHandler object
export type ElectronHandler = typeof electronHandler;
