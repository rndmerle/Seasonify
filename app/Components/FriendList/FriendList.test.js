import { Button, Container, Input } from 'native-base';
import React from 'react';

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
  // const c = shallow(<FriendList {...props} />);
  // console.warn(c.getNode());
  // XXX const component = shallow(<FriendList {...props} />);
  const component = shallowDive(<FriendList {...props} />, Container);
  return {
    props,
    component,
    // innerComponent,
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

describe('Events & Functions', () => {
  const { component, input, button } = setup();

  describe('when entering a name in the input and pressing add', () => {
    beforeAll(() => {
      Identity.forceId('abc123');
      input.props().onChangeText('Someone');
      component.update();
      // FIXME : à priori le state n'est pas pres quand on appelle simulate plus bas. Ou alors c'est un autre sousi de HOC
      button.props().onPress();
      component.update();
    });

    // FIXME
    // it('sets the newFriendName prop', () => {
    //   expect(component.instance().props.newFriendName).toEqual('Someone')
    // });

    // it('calls friendAdd', () => {
    //   expect(props.friendAdd).toBeCalledWith(
    //     'abc123',
    //     'Someone',
    //     AppConfig.defaultFriendColor,
    //   );
    // });
  });

  // describe('with an empty input, when pressing the add button', () => {
  //   const input = component.find(Input);
  //   const button = component.find(Button);
  //
  //   input.props().onChangeText(' ');
  //   button.simulate('press');
  //
  //   it('does nothing', () => {
  //     expect(props.friendAdd).not.toBeCalled();
  //   });
  // });
});
