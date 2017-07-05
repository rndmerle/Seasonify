import { Icon } from 'native-base';
import { StackNavigator } from 'react-navigation';
import React from 'react';

import FriendDetails from 'Components/FriendDetails';
import FriendList from 'Components/FriendList';

const FriendNavigation = StackNavigator(
  {
    FriendListPage: {
      screen: FriendList,
    },
    FriendDetailsPage: {
      screen: FriendDetails,
    },
  },
  {
    initialRouteName: 'FriendListPage',
    mode: 'card',
    headerMode: 'float',
    navigationOptions: {
      drawerLabel: 'Friends',
      drawerIcon: () => <Icon name="contacts" />,
    },
  },
);

export default FriendNavigation;
