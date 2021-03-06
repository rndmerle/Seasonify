/* @flow */
import { Provider } from 'react-redux';
import React from 'react';
import Reactotron from 'reactotron-react-native';

import DebugConfig from 'Config/DebugConfig';
import configure from 'Config/configure';
import createStore from 'Store';
import globals from 'Config/globals';

import Root from './Root';

configure();
globals();
const store = createStore();

export const App = () =>
  (<Provider store={store}>
    <Root />
  </Provider>);

/* istanbul ignore next */
const AppWithBenefits = DebugConfig.useReactotron ? Reactotron.overlay(App) : App;

export default AppWithBenefits;
