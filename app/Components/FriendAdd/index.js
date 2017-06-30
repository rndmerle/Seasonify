/* @flow */
import { connect } from 'react-redux';

import { friendActions } from 'State/friendState';

import FriendAdd from './FriendAdd';

export default connect(null, {
  friendAdd: friendActions.friendAdd,
})(FriendAdd);
