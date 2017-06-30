/* @flow */
import { connect } from 'react-redux';

import { friendActions } from 'State/friendState';
import { uiActions } from 'State/uiState';

import FriendDetails from './FriendDetails';

export default connect(null, {
  friendDelete: friendActions.friendDelete,
  friendUpdate: friendActions.friendUpdate,
  messageToast: uiActions.messageToast,
})(FriendDetails);
