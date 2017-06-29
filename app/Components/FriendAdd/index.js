/* @flow */
import { connect } from 'react-redux';

import friendState from 'State/friendState';

import FriendAdd from './FriendAdd';

export default connect(null, {
  friendAdd: friendState.actions.friendAdd,
})(FriendAdd);
