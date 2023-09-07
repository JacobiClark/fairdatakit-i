import { Store } from 'electron-store';

export const userConfig = new Store({
  name: 'userConfig',
  defaults: {
    defaultTestDatasetPath: '',
  },
});

export const setDefaultTestDatasetPath = (path: string) => {
  userConfig.set('defaultTestDatasetPath', path);
};

export const getDefaultTestDatasetPath = () => {
  return userConfig.get('defaultTestDatasetPath');
};
