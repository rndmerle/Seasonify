/* @flow */
import { Keyboard } from 'react-native';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

import type { Tvshow } from 'Types';
import HeaderModular from 'Components/HeaderModular';

type Props = {
  /* parent */
  navigation: Object,
  tvshowId: string,
  /* connect */
  isEditing: boolean,
  editedObject: Object,
  tvshow: Tvshow,
  tvshowDelete: Function,
  tvshowUpdate: Function,
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
    handleExit: ({ navigation, editEnd, isEditing }: Props) => () => {
      navigation.goBack();
      Keyboard.dismiss();
      if (isEditing) editEnd();
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
    handleDelete: ({ navigation, tvshow, editEnd, tvshowDelete }: Props) => () => {
      navigation.goBack();
      Keyboard.dismiss();
      editEnd();
      tvshowDelete(tvshow.id);
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
