import React from 'react';

import { App } from '../App';

function setup(specificProps = {}) {
  const props = {
    ...specificProps,
  };
  const component = shallow(<App {...props} />);
  return {
    component,
    props,
  };
}

// jest.mock('State', () =>
//   jest.fn().mockReturnValue({
//     subscribe: jest.fn(),
//     dispatch: jest.fn(),
//     getState: jest.fn(),
//   }),
// );

describe('Rendering when default state', () => {
  const { component } = setup();

  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});
