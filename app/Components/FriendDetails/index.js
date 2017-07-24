/* @flow */
import { connect } from 'react-redux';
import React from 'react';

import { editActions, editSelectors } from 'Store/editStore';
import { friendActions, friendSelectors } from 'Store/friendStore';

import FriendDetails from './FriendDetails';
import FriendDetailsHeader from './FriendDetailsHeader';

// $FlowFixMe
FriendDetails.navigationOptions = ({ navigation }) => ({
  header: (
    <FriendDetailsHeader
      friendId={navigation.state.params.friendId}
      navigation={navigation}
    />
  ),
});

export default connect(
  (state, ownProps) => ({
    friend: friendSelectors.getFriend(state, ownProps.navigation.state.params.friendId),
    isEditing: editSelectors.isEditing(state),
    editedObject: editSelectors.editedObject(state),
  }),
  {
    editUpdate: editActions.editUpdate,
    friendUpdate: friendActions.friendUpdate,
  },
)(FriendDetails);
