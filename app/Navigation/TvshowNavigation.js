import React from 'react';
import { Icon } from 'native-base';
import { StackNavigator } from 'react-navigation';

import TvshowList from 'Containers/TvshowList';
import TvshowAdd from 'Containers/TvshowAdd';
import TvshowDetails from 'Containers/TvshowDetails';

const TvshowNavigation = StackNavigator(
  {
    TvshowList: {
      screen: TvshowList,
    },
    TvshowAdd: {
      screen: TvshowAdd,
    },
    TvshowDetails: {
      screen: TvshowDetails,
    },
  },
  {
    initialRouteName: 'TvshowList',
    mode: 'card',
    headerMode: 'float',
    navigationOptions: {
      drawerLabel: 'TV Shows',
      drawerIcon: (/* { tintColor }*/) => <Icon name="star" />,
    },
  },
);

export default TvshowNavigation;
