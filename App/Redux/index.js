import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { autoRehydrate } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../Sagas/';
//
import Config from '../Config/DebugConfig';
import PersistConfig from '../Config/PersistConfig';
import RehydrationServices from '../Services/RehydrationServices';

import ui from './uiRedux';
import edit from './editRedux';
import friends from './friendRedux';
import tvshows from './tvshowRedux';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    ui,
    edit,
    friends,
    tvshows,
  });

  /* ------------- Redux Configuration ------------- */
  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */
  const sagaMonitor = Config.useReactotron
    ? console.tron.createSagaMonitor()
    : null;
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  middleware.push(sagaMiddleware);

  // Assemble Middleware
  enhancers.push(applyMiddleware(...middleware));

  // AutoRehydrate
  if (PersistConfig.active) {
    enhancers.push(autoRehydrate());
  }

  // jhen0409/react-native-debugger
  if (Config.useReduxNativeDevTools && global.reduxNativeDevTools) {
    enhancers.push(global.reduxNativeDevTools(/*options*/));
  }

  // Reactotron if enabled
  const createAppropriateStore = Config.useReactotron
    ? console.tron.createStore
    : createStore;

  // redux-devtools-extension if enabled
  const appropriateCompose = Config.useReduxDevtoolsExtension
    ? composeWithDevTools
    : compose;

  // Creating store
  const store = createAppropriateStore(
    rootReducer,
    appropriateCompose(...enhancers),
  );

  // react-native-debugger again to handle the other added enhancers
  if (Config.useReduxNativeDevTools && global.reduxNativeDevTools) {
    global.reduxNativeDevTools.updateStore(store);
  }

  // Configure persistStore and check reducer version number
  if (PersistConfig.active) {
    RehydrationServices.updateReducers(store);
  }

  // Kick off root Saga
  sagaMiddleware.run(rootSaga);

  return store;
};
