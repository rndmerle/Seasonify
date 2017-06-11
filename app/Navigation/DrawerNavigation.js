import { DrawerNavigator } from 'react-navigation';

import FriendNavigation from './FriendNavigation';
import TvshowNavigation from './TvshowNavigation';

const DrawerNavigation = DrawerNavigator(
  {
    TvshowsPage: {
      screen: TvshowNavigation,
    },
    FriendsPage: {
      screen: FriendNavigation,
    },
  },
  {
    drawerWidth: 250,
    initialRouteName: 'TvshowsPage',
    // Should the back button cause a switch to the initial route? If yes, set to initialRoute, otherwise none. Defaults to initialRoute behavior.
    backBehavior: 'initialRoute',
    // More customization : https://github.com/react-community/react-navigation/blob/master/docs/api/navigators/DrawerNavigator.md
  },
);

export default DrawerNavigation;
