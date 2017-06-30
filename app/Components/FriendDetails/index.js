/* @flow */
import { connect } from 'react-redux';

import { friendActions } from 'State/friendState';
import { uiActions } from 'State/uiState';

import FriendDetails from './FriendDetails';

export default connect(null, {
  friendRemove: friendActions.friendRemove,
  friendUpdate: friendActions.friendUpdate,
  messageToast: uiActions.messageToast,
})(FriendDetails);
