import React from 'react';
import { Provider } from 'react-redux';

import Config from 'app/Config';
import createStore from 'app/Redux';
import Root from './Root';

Config();
const store = createStore();

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

// Reactotron overlay
const AppWithBenefits = console.tron.overlay(App);

export default AppWithBenefits;
