import { List } from 'native-base';
import { TouchableOpacity } from 'react-native';
import React from 'react';

import SeasonList from './SeasonList';

function setup(specificProps = {}) {
  const props = {
    navigation: NavigationMock,
    tvshowId: 's1',
    seasons: {
      1: {
        id: 1,
        episodes: 13,
        year: 2014,
      },
      2: {
        id: 2,
        episodes: 13,
        year: 2015,
      },
      3: {
        id: 3,
      },
    },
    seasonViewings: {
      2: [
        {
          friendId: 'f1',
          name: 'Friend 1',
          color: 'pink',
        },
        {
          friendId: 'f2',
          name: 'Friend 2',
          color: 'blue',
        },
      ],
    },
    viewingUnview: jest.fn(),
    ...specificProps,
  };
  const component = shallowDive(<SeasonList {...props} />, List);
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

/* ========= Events & Functions ========= */

describe('Events & Functions', () => {
  const { component, props } = setup();
  const seasonHeader = component.find(TouchableOpacity).first();
  const buttonFriend1 = component.findWhere(node => node.key() === 'f1');

  describe('when calling onPress on Button', () => {
    buttonFriend1.props().onPress();

    it("navigates to friend's page", () => {
      expect(props.navigation.navigate).toBeCalledWith('FriendDetailsPage', {
        friendId: 'f1',
        friendName: 'Friend 1',
      });
    });
  });

  describe('when calling onLongPress on Button', () => {
    buttonFriend1.props().onLongPress();

    it('unview', () => {
      expect(props.viewingUnview).toBeCalledWith(props.tvshowId, 'f1');
    });
  });

  describe('when calling onPress on TouchableOpacity', () => {
    seasonHeader.props().onPress(1);

    it('navigates', () => {
      expect(props.navigation.navigate).toBeCalled();
    });
  });
});
