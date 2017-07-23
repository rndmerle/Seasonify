/* @flow */
import { Text } from 'native-base';
import { connect } from 'react-redux';
import React from 'react';

import { friendActions, friendSelectors } from 'Store/friendStore';
import { sortingActions, sortingKeys, sortingSelectors } from 'Store/sortingStore';
import HeaderRoot from 'Components/HeaderRoot';
import withToggles from 'HOC/withToggles';

import FriendList from './FriendList';

const Header = withToggles([
  {
    stateKey: sortingKeys.FRIEND,
    selector: sortingSelectors.getSorting,
    action: sortingActions.toggleSorting,
    buttonFacets: { ASC: <Text>A-Z</Text>, DESC: <Text>Z-A</Text> },
  },
])(HeaderRoot);

// $FlowFixMe
FriendList.navigationOptions = ({ navigation }) => ({
  header: <Header title="Friends" navigation={navigation} />,
});

export default connect(
  state => ({
    friendsArray: friendSelectors.getFriendsArray(state),
  }),
  {
    friendAdd: friendActions.friendAdd,
  },
)(FriendList);
