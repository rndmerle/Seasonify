import { Icon } from 'native-base';
import { StackNavigator } from 'react-navigation';
import React from 'react';

import FriendDetails from 'Components/FriendDetails';
import TvshowAdd from 'Components/TvshowAdd';
import TvshowDetails from 'Components/TvshowDetails';
import TvshowList from 'Components/TvshowList';

const TvshowNavigation = StackNavigator(
  {
    TvshowListPage: {
      screen: TvshowList,
    },
    TvshowAddPage: {
      screen: TvshowAdd,
    },
    TvshowDetailsPage: {
      screen: TvshowDetails,
    },
    FriendDetailsPage: {
      screen: FriendDetails,
    },
  },
  {
    initialRouteName: 'TvshowListPage',
    mode: 'card',
    headerMode: 'float',
    navigationOptions: {
      drawerLabel: 'TV Shows',
      drawerIcon: (/* { tintColor }*/) => <Icon name="star" />,
    },
  },
);

export default TvshowNavigation;
