import React from 'react';
import { Provider } from 'react-redux';

import Config from 'Config';
import DebugConfig from 'Config/DebugConfig';
import createStore from 'State';
import Root from './Root';

Config();
const store = createStore();

export const App = () =>
  (<Provider store={store}>
    <Root />
  </Provider>);

// Reactotron overlay
const AppWithBenefits = DebugConfig.useReactotron ? console.tron.overlay(App) : App;

export default AppWithBenefits;
