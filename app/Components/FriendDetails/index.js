/* @flow */
import { connect } from 'react-redux';

import friendState from 'State/friendState';
import uiState from 'State/uiState';

import FriendDetails from './FriendDetails';

export default connect(null, {
  friendRemove: friendState.actions.friendRemove,
  friendUpdate: friendState.actions.friendUpdate,
  messageToast: uiState.actions.messageToast,
})(FriendDetails);
