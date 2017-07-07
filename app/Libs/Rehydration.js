import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';

import { uiActions } from 'Store/uiStore';
import PersistConfig from 'Config/PersistConfig';

const updateReducers = store => {
  const reducerVersion = PersistConfig.reducerVersion;
  const config = PersistConfig.storeConfig;
  const start = () => store.dispatch(uiActions.startup());

  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion')
    .then(localVersion => {
      if (localVersion !== reducerVersion) {
        console.tron.display({
          name: 'PURGE',
          value: {
            'Old Version:': localVersion,
            'New Version:': reducerVersion,
          },
          preview: 'Reducer Version Change Detected',
          important: true,
        });
        // Purge store
        persistStore(store, config, start).purge();
        AsyncStorage.setItem('reducerVersion', reducerVersion);
      } else {
        persistStore(store, config, start);
      }
    })
    .catch(() => {
      persistStore(store, config, start);
      AsyncStorage.setItem('reducerVersion', reducerVersion);
    });
};

export default { updateReducers };
