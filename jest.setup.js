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

global.objectValues = map => Object.values(map);

// Hide console.info because of redux-saga cancellation message
const hijackConsole = browserConsole => {
  console.log = (...args) => {
    jest.fn();
  };
};
hijackConsole(console.info);

DebugConfig.useReactotron = false;

// Needed because of some issue when importing react-navigation stuff.
// Might try later to comment that and run Root.test.js again (still a "Native module cannot be null" error ?)
jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(),
}));

global.NavigationMock = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setParams: jest.fn(),
  state: { params: {} },
};
