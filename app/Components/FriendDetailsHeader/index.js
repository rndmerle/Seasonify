/* @flow */
import { connect } from 'react-redux';

import { editActions, editSelectors } from 'Store/editStore';
import { friendActions, friendSelectors } from 'Store/friendStore';
import { uiActions } from 'Store/uiStore';

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
