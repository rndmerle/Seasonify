/* @flow */
import { connect } from 'react-redux';
import React from 'react';

import { friendActions, friendSelectors } from 'State/friendState';
import HeaderRoot from 'Components/HeaderRoot';

import FriendList from './FriendList';

FriendList.navigationOptions = ({ navigation }) => ({
  header: <HeaderRoot title="Friends" navigation={navigation} />,
});

export default connect(
  state => ({
    friends: friendSelectors.getFriends(state),
  }),
  {
    friendAdd: friendActions.friendAdd,
  },
)(FriendList);
