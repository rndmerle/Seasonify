// Make Enzyme functions available in all test files without importing
import { shallow } from 'enzyme';
global.shallow = shallow;
// global.render = render;
// global.mount = mount;

// Fail tests on any warning
console.error = message => {
  throw new Error(message);
};
