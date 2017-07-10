import { Button, Container, Input } from 'native-base';
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

describe('Rendering when editing', () => {
  const { component } = setup({
    isEditing: true,
    editedObject: { name: 'A friend mod' },
  });
  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});

// describe('Rendering when opening the color picker', () => {
//   const { component } = setup();
//   const colorButton = component.find(Button).first();
//   colorButton.props().onPress();
//   component.update();
//
//   it('should display color picker', () => {
//     expect(component.find(ColorPicker)).toHaveLength(1);
//   });
//
//   it('should match', () => {
//     expect(component).toMatchSnapshot();
//   });
// });

/* ========= Events & Functions ========= */

describe('Events & Functions', () => {
  const { component, props } = setup();
  const inputs = component.find(Input);
  const colorButton = component.find(Button).first();

  describe('when calling onChangeName', () => {
    inputs.first().props().onChangeText('New name');

    it('calls editUpdate', () => {
      expect(props.editUpdate).toBeCalledWith({
        id: props.friend.id,
        name: 'New name',
      });
    });
  });

  // describe('when pressing color colorButton', () => {
  //   colorButton.props().onPress();
  //   component.update();
  //   const picker = component.find(ColorPicker);
  //
  //   it('calls editUpdate', () => {
  //     expect(props.friendUpdate).toBeCalled();
  //   });
  // });

  // describe('when calling onChangeColor', () => {
  //   const picker = component.find(Picker);
  //   picker.props().onValueChange('blue');
  //
  //   it('calls friendUpdate', () => {
  //     expect(props.friendUpdate).toBeCalledWith({
  //       id: props.friend.id,
  //       color: 'blue',
  //     });
  //   });
  // });
});
