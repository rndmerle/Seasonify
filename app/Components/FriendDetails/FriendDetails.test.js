import { Button, Container, Input } from 'native-base';
import { ColorPicker } from 'react-native-color-picker';
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
      color: 'pink',
    },
    isEditing: false,
    editedObject: {},
    editUpdate: jest.fn(),
    friendUpdate: jest.fn(),
    ...specificProps,
  };
  const parent = shallow(<FriendDetails {...props} />);
  const level = [];
  level[0] = parent;
  level[1] = parent.dive();
  level[2] = level[1].dive();
  const component = level[2];
  return {
    component,
    parent,
    level,
    props,
    colorButton: component.find(Button).first(),
    inputs: component.find(Input),
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

describe('Rendering when editing', () => {
  const { component } = setup({
    isEditing: true,
    editedObject: { name: 'A friend mod' },
  });
  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});

describe('When picker visibility is true', () => {
  const { component } = setup();
  component.setProps({ isPickerVisible: true });

  it('displays the color picker', () => {
    expect(component.find(ColorPicker)).toHaveLength(1);
  });
});

/* ========= Events & Functions ========= */

describe('Events & Functions', () => {
  const { parent, props, colorButton, inputs } = setup();

  describe('When clicking the color picker', () => {
    colorButton.props().onPress();

    it('updates the picker visibility state', () => {
      expect(parent.state().isPickerVisible).toEqual(true);
    });
  });

  describe('when calling onChangeName', () => {
    inputs.first().props().onChangeText('New name');

    it('calls editUpdate', () => {
      expect(props.editUpdate).toBeCalledWith({
        id: props.friend.id,
        name: 'New name',
      });
    });
  });
});
