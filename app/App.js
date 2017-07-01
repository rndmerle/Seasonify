/* @flow */
import { Provider } from 'react-redux';
import React from 'react';

import DebugConfig from 'Config/DebugConfig';
import Config from 'Config';
import createStore from 'State';
import globals from 'Config/globals';

import Root from './Root';

Config();
globals();
const store = createStore();

export const App = () =>
  (<Provider store={store}>
    <Root />
  </Provider>);

/* istanbul ignore next */
const AppWithBenefits = DebugConfig.useReactotron
  ? /* $FlowExpectedError */
    console.tron.overlay(App)
  : App;

export default AppWithBenefits;
