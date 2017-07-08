import { ListItem } from 'native-base';
import React from 'react';

import FriendItem from './FriendItem';

function setup(specificProps = {}) {
  const props = {
    friend: { id: 'abc123', name: 'Someone' },
    navigate: jest.fn(),
    ...specificProps,
  };
  const component = shallowDive(<FriendItem {...props} />, ListItem);
  return {
    component,
    props,
  };
}

describe('Rendering', () => {
  it('should render', () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });
});

describe('Events', () => {
  it('should call navigation.navigate', () => {
    const { component, props } = setup();
    component.find(ListItem).simulate('press');
    expect(props.navigate).toBeCalledWith('FriendDetailsPage', {
      friendId: props.friend.id,
    });
  });
});
