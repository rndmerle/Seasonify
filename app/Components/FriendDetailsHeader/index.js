/* @flow */
import { connect } from 'react-redux';

import { editActions, editSelectors } from 'State/editState';
import { friendActions, friendSelectors } from 'State/friendState';
import { uiActions } from 'State/uiState';

import FriendDetailsHeader from './FriendDetailsHeader';

export default connect(
  (state, ownProps) => ({
    isEditing: editSelectors.isEditing(state),
    editedObject: editSelectors.editedObject(state),
    friend: friendSelectors.getFriend(state, ownProps.friendId),
  }),
  {
    friendDelete: friendActions.friendDelete,
    friendUpdate: friendActions.friendUpdate,
    messageToast: uiActions.messageToast,
    editStart: editActions.editStart,
    editEnd: editActions.editEnd,
  },
)(FriendDetailsHeader);
