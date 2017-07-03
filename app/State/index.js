import { autoRehydrate } from 'redux-persist';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { resettableReducer } from 'reduxsauce';
import createSagaMiddleware from 'redux-saga';

import AppConfig from 'Config/AppConfig';
import DebugConfig from 'Config/DebugConfig';
import PersistConfig from 'Config/PersistConfig';
import Rehydration from 'Libs/Rehydration';
import editState from 'State/editState';
import friendState from 'State/friendState';
import rootSaga from 'Sagas/rootSaga';
import tvshowState from 'State/tvshowState';
import uiState from 'State/uiState';
import undoState from 'State/undoState';
import viewingState from 'State/viewingState';

export default () => {
  // listen for the RESET action
  const resettable = resettableReducer(AppConfig.resetAction);

  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    ui: resettable(uiState),
    undo: resettable(undoState),
    edit: editState,
    friends: friendState,
    tvshows: tvshowState,
    viewings: viewingState,
  });

  /* ------------- Redux Configuration ------------- */
  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */
  const sagaMonitor = DebugConfig.useReactotron ? console.tron.createSagaMonitor() : null;
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  middleware.push(sagaMiddleware);

  // Assemble Middleware
  enhancers.push(applyMiddleware(...middleware));

  // AutoRehydrate
  if (PersistConfig.active) {
    enhancers.push(autoRehydrate());
  }

  // jhen0409/react-native-debugger
  if (DebugConfig.useReduxNativeDevTools && global.reduxNativeDevTools) {
    enhancers.push(global.reduxNativeDevTools(/* options*/));
  }

  // Reactotron if enabled
  const createAppropriateStore = DebugConfig.useReactotron
    ? console.tron.createStore
    : createStore;

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
    Rehydration.updateReducers(store);
  }

  // Kick off root Saga
  sagaMiddleware.run(rootSaga);

  return store;
};
