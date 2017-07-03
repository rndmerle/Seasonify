import { Container } from 'native-base';
import React from 'react';

import SingleFAB from 'Components/SingleFAB';

import FriendList from './FriendList';

function setup(specificProps = {}) {
  const props = {
    navigation: NavigationMock,
    friends: {
      abc123: { id: 'abc123', name: 'Someone' },
      xyz890: { id: 'xyz890', name: 'Someone else' },
    },
    ...specificProps,
  };
  const component = shallowDive(<FriendList {...props} />, Container);
  return {
    component,
    props,
  };
}

describe('Rendering when 2 friends', () => {
  const { component } = setup();
  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});

describe('Rendering when no friends', () => {
  const { component } = setup({ friends: {} });
  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});

/* ========= Events & Functions ========= */

describe('Events & Functions', () => {
  const { component, props } = setup();
  const singleFAB = component.find(SingleFAB);

  describe('when calling onPress on SingleFAB', () => {
    singleFAB.simulate('press');

    it('calls navigate', () => {
      expect(props.navigation.navigate).toBeCalledWith('FriendAddPage');
    });
  });
});
