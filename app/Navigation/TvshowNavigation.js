import { Icon } from 'native-base';
import { StackNavigator } from 'react-navigation';
import React from 'react';

import FriendDetails from 'Components/FriendDetails';
import PickScreen from 'Components/PickScreen';
import TvshowAdd from 'Components/TvshowAdd';
import TvshowDetails from 'Components/TvshowDetails';
import TvshowList from 'Components/TvshowList';

const TvshowNavigation = StackNavigator(
  {
    TvshowListPage: {
      screen: TvshowList,
    },
    TvshowDetailsPage: {
      screen: TvshowDetails,
    },
    TvshowAddPage: {
      screen: TvshowAdd,
    },
    FriendDetailsPage: {
      screen: FriendDetails,
    },
    PickPage: {
      screen: PickScreen,
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
