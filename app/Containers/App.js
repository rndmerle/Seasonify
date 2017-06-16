/* @flow */
import { Provider } from 'react-redux';
import React from 'react';

import Config from 'Config';
import DebugConfig from 'Config/DebugConfig';
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

// Reactotron overlay. $FlowExpectedError
const AppWithBenefits = DebugConfig.useReactotron ? console.tron.overlay(App) : App;

export default AppWithBenefits;
