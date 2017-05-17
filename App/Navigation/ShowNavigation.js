import React from 'react';
import { Icon } from 'native-base';
import { StackNavigator } from 'react-navigation';

import ShowList from '../Containers/ShowList';
import ShowAdd from '../Containers/ShowAdd';
import ShowDetails from '../Containers/ShowDetails';

const ShowNavigation = StackNavigator(
  {
    ShowList: {
      screen: ShowList,
    },
    ShowAdd: {
      screen: ShowAdd,
    },
    ShowDetails: {
      screen: ShowDetails,
    },
  },
  {
    initialRouteName: 'ShowList',
    mode: 'card',
    headerMode: 'float',
    navigationOptions: {
      drawerLabel: 'TV Shows',
      drawerIcon: ({ tintColor }) => (<Icon name="star" />),
    },
  },
);

export default ShowNavigation;
