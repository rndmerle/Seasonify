import React from 'react';
import { Icon } from 'native-base';
import { StackNavigator } from 'react-navigation';

import TvshowList from 'app/Containers/TvshowList';
import TvshowAdd from 'app/Containers/TvshowAdd';
import TvshowDetails from 'app/Containers/TvshowDetails';

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
      drawerIcon: ({ tintColor }) => <Icon name="star" />,
    },
  },
);

export default TvshowNavigation;
