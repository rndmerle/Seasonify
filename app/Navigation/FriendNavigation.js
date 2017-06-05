import React from 'react';
import { Icon } from 'native-base';
import { StackNavigator } from 'react-navigation';

import FriendList from '../Containers/FriendList';
import FriendAdd from '../Containers/FriendAdd';
import FriendDetails from '../Containers/FriendDetails';

const FriendNavigation = StackNavigator(
  {
    FriendList: {
      screen: FriendList,
    },
    FriendAdd: {
      screen: FriendAdd,
    },
    FriendDetails: {
      screen: FriendDetails,
    },
  },
  {
    initialRouteName: 'FriendList',
    mode: 'card',
    headerMode: 'float',
    navigationOptions: {
      drawerLabel: 'Friends',
      drawerIcon: () => <Icon name="contacts" />,
    },
  },
);

export default FriendNavigation;
