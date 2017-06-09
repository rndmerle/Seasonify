import { autoRehydrate } from 'redux-persist';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { resettableReducer } from 'reduxsauce';
import createSagaMiddleware from 'redux-saga';

import { reducer as editReducer } from './editRedux';
import { reducer as friendReducer } from './friendRedux';
import { reducer as tvshowReducer } from './tvshowRedux';
import { reducer as uiReducer } from './uiRedux';
import AppConfig from '../Config/AppConfig';
import DebugConfig from '../Config/DebugConfig';
import PersistConfig from '../Config/PersistConfig';
import Rehydration from '../Services/Rehydration';
import rootSaga from '../Sagas/rootSaga';

export default () => {
  // listen for the RESET action
  const resettable = resettableReducer(AppConfig.resetAction);

  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    ui: resettable(uiReducer),
    edit: editReducer,
    friends: friendReducer,
    tvshows: tvshowReducer,
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
