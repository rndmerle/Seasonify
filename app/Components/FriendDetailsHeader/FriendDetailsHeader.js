/* @flow */
import { Keyboard } from 'react-native';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

import type { Friend } from 'Types';
import HeaderModular from 'Components/HeaderModular';

type Props = {
  /* parent */
  navigate: Function,
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
  /* state */
  /* handlers */
  handleExit: Function,
  handleEdit: Function,
  handleDone: Function,
  handleDelete: Function,
};

const enhance = compose(
  pure,
  withHandlers({
    handleExit: ({ navigate, editEnd }: Props) => () => {
      // Note : a goBack() would prevent Toast to stay in foreground
      navigate('FriendListPage');
      Keyboard.dismiss();
      editEnd();
    },
    handleEdit: ({ editStart }: Props) => () => {
      editStart();
    },
    handleDone: ({ editedObject, friendUpdate, messageToast, editEnd }: Props) => () => {
      Keyboard.dismiss();
      if (editedObject.id) {
        friendUpdate(editedObject);
        messageToast('success', `“${editedObject.name}” edited`);
      }
      editEnd();
    },
    handleDelete: ({ navigate, friend, editEnd, friendDelete }: Props) => () => {
      // Note : a goBack() would prevent Toast to stay in foreground
      navigate('FriendListPage');
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
