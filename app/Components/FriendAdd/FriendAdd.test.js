import React from 'react';

import FriendAdd from './FriendAdd';

function setup(specificProps = {}) {
  const props = {
    navigation: NavigationMock,
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
