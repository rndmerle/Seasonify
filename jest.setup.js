import axios from 'axios';

/* eslint-disable  no-unused-vars, no-console */
import DebugConfig from 'Config/DebugConfig';

import { shallow } from 'enzyme';

import globals from 'Config/globals';
import until from 'Libs/until';

globals();

global.shallow = shallow;

global.shallowDive = (Component, target, context = {}) => {
  if (typeof target === 'object') {
    target = target.displayName;
  }
  return shallow(Component, context)::until(target);
};

global.diveUntil = (wrapper, target) => {
  if (wrapper.isEmptyRender() || typeof wrapper.getNode().type === 'string') {
    return wrapper;
  }
  return wrapper.is(target.displayName)
    ? wrapper
    : global.diveUntil(wrapper.shallow(), target);
}

global.objectValues = map => Object.values(map);

// Polyfil axios for Jest, or else I get a "this.dispatchEvent is not a function" error
global.axios = axios;

// Hide console.info because of redux-saga cancellation message
const hijackConsole = initialFunction => {
  console.info = (...args) => {
    jest.fn();
  };
};
hijackConsole(console.info);

// Hide "[...effects] is deprecated" redux-saga's warnings in Jest.
// It's maybe coming from redux-saga-test-plan but I've no clue.
const removeSagaDeprecation = initialFunction => {
  console.warn = (...args) => {
    if (!args[0].startsWith('[...effects] has been deprecated')) {
      initialFunction(...args)
    } else {
      jest.fn();
    }
  };
};
removeSagaDeprecation(console.warn);

// Needed because of some issue when importing react-navigation stuff.
// Might try later to comment that and run Root.test.js again (still a "Native module cannot be null" error ?)
jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(),
}));

jest.mock('Themes/cssColors', () => ({
  pink: '#ffc0cb',
  blue: '#0000ff',
}));

global.NavigationMock = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setParams: jest.fn(),
  state: { params: {} },
};

DebugConfig.useReactotron = false;
