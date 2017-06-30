import { Container, Input } from 'native-base';
import React from 'react';

import FriendDetails from './FriendDetails';

function setup(specificProps = {}) {
  const props = {
    navigation: {
      navigate: jest.fn(),
      state: { params: { friendId: 'abc123' } },
    },
    friend: {
      id: 'abc123',
      name: 'A friend',
    },
    isEditing: false,
    editedObject: {},
    editUpdate: jest.fn(),
    ...specificProps,
  };
  const component = shallowDive(<FriendDetails {...props} />, Container);
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

describe('Rendering when no friend', () => {
  const { component } = setup({ friend: undefined });
  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});

/* ========= Events & Functions ========= */

describe('Events & Functions', () => {
  const { component, props } = setup();
  const input = component.find(Input);

  describe('when calling onChangeName', () => {
    input.props().onChangeText('New name');

    it('calls editUpdate', () => {
      expect(props.editUpdate).toBeCalledWith({
        id: props.friend.id,
        name: 'New name',
      });
    });
  });
});
