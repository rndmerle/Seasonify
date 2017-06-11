import { shallow } from 'enzyme';

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
// global.render = render;
// global.mount = mount;

// Fail tests on any warning
console.error = message => {
  throw new Error(message);
};

// Hide console.info because of redux-saga cancellation message
const hijackConsole = browserConsole => {
  console.log = (...args) => {
    jest.fn();
  };
};
hijackConsole(console.info);
// and reactotron so it does'nt mess around
// hijackConsole(console.tron);

// Needed because of some issue when importing react-navigation stuff.
// Might try later to comment that and run Root.test.js again (still a "Native module cannot be null" error ?)
jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(),
}));

//
// jest.mock('./app/Libs/Identity', () => {
//   const usedIds = require('./app/Fixtures/uuids.json');
//   const mockId = jest
//     .fn()
//     .mockReturnValueOnce(usedIds[0])
//     .mockReturnValueOnce(usedIds[1])
//     .mockReturnValueOnce(usedIds[2])
//     .mockReturnValue(usedIds[3]);
//   let id = null;
//   return {
//     newid: jest.fn().mockImplementation(() => {
//       id = mockId();
//       return id;
//     }),
//     id: jest.fn().mockImplementation(() => id),
//     usedIds,
//   };
// });
