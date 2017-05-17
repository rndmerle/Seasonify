import { DrawerNavigator } from 'react-navigation';

import FriendNavigation from './FriendNavigation';
import ShowNavigation from './ShowNavigation';

const DrawerNavigation = DrawerNavigator(
  {
    Shows: {
      screen: ShowNavigation,
    },
    Friends: {
      screen: FriendNavigation,
    },
  },
  {
    drawerWidth: 250,
    initialRouteName: 'Shows',
    // Should the back button cause switch to the initial route? If yes, set to initialRoute, otherwise none. Defaults to initialRoute behavior.
    backBehavior: 'initialRoute',
    // More customization : https://github.com/react-community/react-navigation/blob/master/docs/api/navigators/DrawerNavigator.md
  },
);

export default DrawerNavigation;
