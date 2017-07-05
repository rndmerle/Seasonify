import { Button, List } from 'native-base';
import React from 'react';

import SeasonList from './SeasonList';

function setup(specificProps = {}) {
  const props = {
    navigation: NavigationMock,
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
  const button = component.find(Button).first();

  describe('when calling onPress on Button', () => {
    button.props().onPress();

    it('calls ', () => {
      expect(props.navigation.navigate).toBeCalledWith('FriendDetailsPage', {
        friendId: 'f1',
        friendName: 'Friend 1',
      });
    });
  });
});
