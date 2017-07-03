/* @flow */
import { Keyboard } from 'react-native';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

import type { Friend } from 'Types';
import HeaderModular from 'Components/HeaderModular';

type Props = {
  /* parent */
  navigation: Object,
  friendId: string,
  /* connect */
  isEditing: boolean,
  editedObject: Object,
  friend: Friend,
  friendDelete: Function,
  friendUpdate: Function,
  messageToast: Function,
  editStart: Function,
  editEnd: Function,
  /* HOC */
  handleExit: Function,
  handleEdit: Function,
  handleDone: Function,
  handleDelete: Function,
};

const enhance = compose(
  pure,
  withHandlers({
    handleExit: ({ navigation, editEnd }: Props) => () => {
      navigation.goBack();
      Keyboard.dismiss();
      editEnd();
    },
    handleEdit: ({ editStart }: Props) => () => {
      editStart();
    },
    handleDone: ({
      editedObject,
      friendUpdate,
      friend,
      messageToast,
      editEnd,
    }: Props) => () => {
      Keyboard.dismiss();
      if (editedObject.id) {
        friendUpdate(editedObject);
        messageToast(
          'success',
          `“${friend.name}” edited${editedObject.name
            ? ` to “${editedObject.name}”`
            : ''}`,
        );
      }
      editEnd();
    },
    handleDelete: ({ navigation, friend, editEnd, friendDelete }: Props) => () => {
      navigation.goBack();
      Keyboard.dismiss();
      editEnd();
      friendDelete(friend.id);
    },
  }),
);

function FriendDetailsHeader({
  isEditing,
  friend,
  handleExit,
  handleEdit,
  handleDone,
  handleDelete,
}: Props) {
  return (
    <HeaderModular
      title={friend.name}
      cancelButton={{ icon: 'arrow-back', action: handleExit }}
      actionButtons={[
        {
          visibleIf: !isEditing,
          icon: 'create',
          action: handleEdit,
        },
        {
          visibleIf: isEditing,
          hideByDefault: true,
          icon: 'checkmark',
          action: handleDone,
        },
        { icon: 'trash', action: handleDelete },
      ]}
    />
  );
}

export default enhance(FriendDetailsHeader);
