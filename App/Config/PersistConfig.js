import { AsyncStorage } from 'react-native';

export default {
  active: false,
  reducerVersion: '0.2',
  storeConfig: {
    storage: AsyncStorage,
    // blacklist: ['login', 'search'], // reducer keys NOT stored to persistence
    whitelist: ['friends'], // Optionally, just specify the keys you DO want stored to
    // transforms: [immutablePersistenceTransform]
  },
};
