import React from 'react';

import FriendAdd from './FriendAdd';

function setup(specificProps = {}) {
  const props = {
    navigation: {
      navigate: jest.fn(),
      goBack: jest.fn(),
      setParams: jest.fn(),
      state: { params: {} },
    },
    ...specificProps,
  };
  const component = shallow(<FriendAdd {...props} />);
  return {
    component,
    props,
  };
}

describe('Rendering when default state', () => {
  const { component } = setup();
  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});
