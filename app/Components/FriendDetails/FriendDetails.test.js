import { Container } from 'native-base';
import React from 'react';

import FriendDetails from './FriendDetails';

function setup(specificProps = {}) {
  const props = {
    navigation: {
      navigate: jest.fn(),
      goBack: jest.fn(),
      setParams: jest.fn(),
      state: {
        params: {
          isEditing: false,
          friend: { id: 'abc123', name: 'Someone' },
        },
      },
    },
    friendRemove: jest.fn(),
    friendUpdate: jest.fn(),
    messageToast: jest.fn(),
    ...specificProps,
  };
  const component = shallowDive(<FriendDetails {...props} />, Container);
  return {
    component,
    props,
  };
}

describe('Rendering when editing', () => {
  const { component } = setup();
  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});
