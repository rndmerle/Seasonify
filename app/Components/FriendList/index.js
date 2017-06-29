/* @flow */
import { connect } from 'react-redux';
import React from 'react';

import HeaderRoot from 'Components/HeaderRoot';
import friendState from 'State/friendState';

import FriendList from './FriendList';

FriendList.navigationOptions = ({ navigation }) => ({
  header: <HeaderRoot title="Friends" navigation={navigation} />,
});

export default connect(
  state => ({
    friends: friendState.selectors.getFriends(state),
  }),
  {},
)(FriendList);
