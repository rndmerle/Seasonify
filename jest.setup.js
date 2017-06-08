import { shallow } from 'enzyme';
import Identity from './app/Libs/Identity';
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
