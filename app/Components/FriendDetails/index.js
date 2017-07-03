/* @flow */
import { connect } from 'react-redux';
import React from 'react';

import { editActions, editSelectors } from 'State/editState';
import { friendSelectors } from 'State/friendState';
import FriendDetailsHeader from 'Components/FriendDetailsHeader';

import FriendDetails from './FriendDetails';

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
  },
)(FriendDetails);
