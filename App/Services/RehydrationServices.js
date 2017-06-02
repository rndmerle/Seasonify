import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';
import PersistConfig from 'app/Config/PersistConfig';
import { startupActions } from 'app/Redux/startupRedux';

const updateReducers = (store: Object) => {
  const reducerVersion = PersistConfig.reducerVersion;
  const config = PersistConfig.storeConfig;
  const startup = () => store.dispatch(startupActions.startup());

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
        persistStore(store, config, startup).purge();
        AsyncStorage.setItem('reducerVersion', reducerVersion);
      } else {
        persistStore(store, config, startup);
      }
    })
    .catch(() => {
      persistStore(store, config, startup);
      AsyncStorage.setItem('reducerVersion', reducerVersion);
    });
};

export default { updateReducers };
