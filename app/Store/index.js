/* @flow */
import { autoRehydrate, persistStore } from 'redux-persist';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { resettableReducer } from 'reduxsauce';
import Reactotron from 'reactotron-react-native';
import createMigration from 'redux-persist-migrate';
import createSagaMiddleware from 'redux-saga';

import AppConfig from 'Config/AppConfig';
import DebugConfig from 'Config/DebugConfig';
import PersistConfig from 'Config/PersistConfig';
import editStore, { type EditState } from 'Store/editStore';
import friendStore, { type FriendState } from 'Store/friendStore';
import loadingStore, { type LoadingState } from 'Store/loadingStore';
import rootSaga from 'Sagas/rootSaga';
import sortingStore, { type SortingState } from 'Store/sortingStore';
import tvshowStore, { type TvshowState } from 'Store/tvshowStore';
import uiStore, { type UiState, uiActions } from 'Store/uiStore';
import undoStore, { type UndoState } from 'Store/undoStore';
import viewingStore, { type ViewingState } from 'Store/viewingStore';

export type FullState = {
  ui: UiState,
  undo: UndoState,
  edit: EditState,
  friends: FriendState,
  tvshows: TvshowState,
  viewings: ViewingState,
  sorting: SortingState,
  loading: LoadingState,
};

export default () => {
  // listen for the RESET action
  const resettable = resettableReducer(AppConfig.resetAction);

  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    ui: resettable(uiStore),
    undo: resettable(undoStore),
    edit: editStore,
    friends: friendStore,
    tvshows: tvshowStore,
    viewings: viewingStore,
    sorting: resettable(sortingStore),
    loading: loadingStore,
  });

  /* ------------- Redux Configuration ------------- */
  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */
  const sagaMonitor = DebugConfig.useReactotron ? Reactotron.createSagaMonitor() : null;
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  middleware.push(sagaMiddleware);

  // Assemble Middleware
  enhancers.push(applyMiddleware(...middleware));

  // jhen0409/react-native-debugger
  if (DebugConfig.useReduxNativeDevTools && global.reduxNativeDevTools) {
    enhancers.push(global.reduxNativeDevTools(/* options*/));
  }

  // Reactotron if enabled
  const createAppropriateStore = DebugConfig.useReactotron
    ? Reactotron.createStore
    : createStore;

  // autoRehydrate from redux-persist et handle migrations with redux-persist-migrate
  if (PersistConfig.active) {
    const manifest = PersistConfig.migrationManifest;
    const reducerKeyforVersion = 'app';
    const migration = createMigration(manifest, reducerKeyforVersion);
    enhancers.push(migration);
    enhancers.push(autoRehydrate());
  }

  // redux-devtools-extension if enabled
  const appropriateCompose = DebugConfig.useReduxDevtoolsExtension
    ? composeWithDevTools
    : compose;

  // Creating store
  const store = createAppropriateStore(rootReducer, appropriateCompose(...enhancers));

  // react-native-debugger again to handle the other added enhancers
  if (DebugConfig.useReduxNativeDevTools && global.reduxNativeDevTools) {
    global.reduxNativeDevTools.updateStore(store);
  }

  // Configure persistStore and check reducer version number
  if (PersistConfig.active) {
    const start = () => store.dispatch(uiActions.startup());
    const config = PersistConfig.storeConfig;
    persistStore(store, config, start);
  }

  // Kick off root Saga
  sagaMiddleware.run(rootSaga);

  return store;
};
