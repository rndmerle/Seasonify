import React from 'react';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';

import ui from 'State/uiState';
import tv from 'State/tvshowState';
import editState from 'State/editState';
import HeaderModular from 'Components/HeaderModular';

const mapStateToProps = (state, ownProps) => ({
  isEditing: editState.selectors.isEditing(state),
  editedObject: editState.selectors.editedObject(state),
  getTvshow: tv.selectors.getTvshow(state, ownProps.tvshowId),
});

const mapActionsToProps = {
  tvshowRemove: tv.actions.tvshowRemove,
  tvshowUpdate: tv.actions.tvshowUpdate,
  messageToast: ui.actions.messageToast,
  editStart: editState.actions.editStart,
  editEnd: editState.actions.editEnd,
};

export function TvshowDetailsHeader({
  navigate,
  tvshowId, // eslint-disable-line no-unused-vars
  isEditing,
  editedObject,
  getTvshow,
  tvshowRemove,
  tvshowUpdate,
  messageToast,
  editStart,
  editEnd,
}) {
  const tvshow = getTvshow;

  const handleExit = () => {
    navigate('TvshowListPage', {}); // Note : a goBack() would prevent Toast to stay in foreground
    Keyboard.dismiss();
    if (isEditing) {
      editEnd();
    }
  };

  const handleEdit = () => {
    editStart();
  };

  const handleDone = () => {
    Keyboard.dismiss();
    if (editedObject.id) {
      tvshowUpdate(editedObject);
      messageToast('success', `${editedObject.name} has been edited`);
    }
    editEnd();
  };

  const handleDelete = () => {
    handleExit();
    tvshowRemove(tvshow.id);
    messageToast('warning', `${tvshow.name} has been deleted`);
  };

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

export default connect(mapStateToProps, mapActionsToProps)(TvshowDetailsHeader);
