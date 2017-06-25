import { AsyncStorage } from 'react-native';

export default {
  active: true,
  reducerVersion: '0.4',
  storeConfig: {
    storage: AsyncStorage,
    // blacklist: ['login', 'search'], // reducer keys NOT stored to persistence
    whitelist: ['tvshows', 'friends'], // Optionally, just specify the keys you DO want stored to
    // transforms: [immutablePersistenceTransform]
  },
};
