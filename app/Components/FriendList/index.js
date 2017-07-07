/* @flow */
import { connect } from 'react-redux';
import React from 'react';

import { friendActions, friendSelectors } from 'Store/friendStore';
import { sortingKeys } from 'Store/sortingStore';
import HeaderRootWithSorting from 'Components/HeaderRootWithSorting';

import FriendList from './FriendList';

FriendList.navigationOptions = ({ navigation }) => ({
  header: (
    <HeaderRootWithSorting
      title="Friends"
      navigation={navigation}
      sortingKey={sortingKeys.FRIEND}
    />
  ),
});

export default connect(
  state => ({
    friendsArray: friendSelectors.getFriendsArray(state),
  }),
  {
    friendAdd: friendActions.friendAdd,
  },
)(FriendList);
