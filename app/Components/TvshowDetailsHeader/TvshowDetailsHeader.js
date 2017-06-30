/* @flow */
import { Keyboard } from 'react-native';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

import type { Tvshow } from 'Types';
import HeaderModular from 'Components/HeaderModular';
import undoState from 'State/undoState';

type Props = {
  /* parent */
  navigate: Function,
  tvshowId: string,
  /* connect */
  isEditing: boolean,
  editedObject: Object,
  tvshow: Tvshow,
  tvshowRemove: Function,
  tvshowUpdate: Function,
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
      navigate('TvshowListPage');
      Keyboard.dismiss();
      editEnd();
    },
    handleEdit: ({ editStart }: Props) => () => {
      editStart();
    },
    handleDone: ({ editedObject, tvshowUpdate, messageToast, editEnd }: Props) => () => {
      Keyboard.dismiss();
      if (editedObject.id) {
        tvshowUpdate(editedObject);
        messageToast('success', `“${editedObject.name}” edited`);
      }
      editEnd();
    },
    handleDelete: ({
      navigate,
      tvshow,
      editEnd,
      tvshowRemove,
      messageToast,
    }: Props) => () => {
      // Note : a goBack() would prevent Toast to stay in foreground
      navigate('TvshowListPage');
      Keyboard.dismiss();
      editEnd();
      tvshowRemove(tvshow.id);
      messageToast(
        'warning',
        `“${tvshow.name}” deleted`,
        'UNDO',
        undoState.actions.undo(),
      );
    },
  }),
);

function TvshowDetailsHeader({
  isEditing,
  tvshow,
  handleExit,
  handleEdit,
  handleDone,
  handleDelete,
}: Props) {
  return (
    <HeaderModular
      title={tvshow.name}
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

export default enhance(TvshowDetailsHeader);
