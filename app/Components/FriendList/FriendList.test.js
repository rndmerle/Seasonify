import { Button, Input } from 'native-base';
import React from 'react';

import AppConfig from 'Config/AppConfig';
import Identity from 'Libs/Identity';

import FriendList from './FriendList';

function setup(specificProps = {}) {
  const props = {
    navigation: NavigationMock,
    friendsArray: [
      { id: 'abc123', name: 'Someone' },
      { id: 'xyz890', name: 'Someone else' },
    ],
    friendAdd: jest.fn(),
    ...specificProps,
  };
  const parent = shallow(<FriendList {...props} />);
  const level = [];
  level[0] = parent;
  level[1] = parent.dive();
  level[2] = level[1].dive();
  const component = level[2];
  return {
    props,
    parent,
    level,
    component,
    input: component.find(Input),
    button: component.find(Button),
  };
}

describe('Rendering when 2 friends', () => {
  const { component } = setup();
  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});

describe('Rendering when no friends', () => {
  const { component } = setup({ friendsArray: [] });
  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});

/* ========= Events & Functions ========= */

describe('when entering a name in the input', () => {
  const { parent, input } = setup();
  input.props().onChangeText('Someone');

  it('sets the newFriendName prop', () => {
    expect(parent.state().newFriendName).toEqual('Someone');
  });
});

describe('when pressing add with a newFriendName set', () => {
  Identity.forceId('abc123');
  const { level, props, button } = setup();
  level[1].setProps({
    newFriendName: 'Someone',
  });
  button.props().onPress();

  it('calls friendAdd', () => {
    expect(props.friendAdd).toBeCalledWith(
      'abc123',
      'Someone',
      AppConfig.defaultFriendColor,
    );
  });
});

describe('when pressing add with NO newFriendName set', () => {
  const { props, button } = setup();
  button.props().onPress();

  it('does not call friendAdd', () => {
    expect(props.friendAdd).not.toBeCalled();
  });
});
