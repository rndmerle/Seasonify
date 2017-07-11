import { AsyncStorage } from 'react-native';

export default {
  active: true,
  storeConfig: {
    storage: AsyncStorage,
    // blacklist: ['login', 'search'], // reducer keys NOT stored to persistence
    whitelist: ['tvshows', 'friends', 'viewings'], // Optionally, just specify the keys you DO want stored to
    // transforms: [immutablePersistenceTransform]
  },
  migrationManifest: {
    // When a new state must be defined (typically with a default value or else it breaks the app), add a line with an increased number and define the new state (set undefined to remove a key)
    1: state => ({ ...state }),
    // 2: state => ({
    //   ...state,
    //   newDomain: [],
    //   ui: { ...state.ui, uselessStateKey: undefined },
    // }),
  },
};
