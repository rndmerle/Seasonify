import React from 'react';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';

import { tvshowActions } from '../Redux/tvshowRedux';
import { uiActions } from '../Redux/uiRedux';
import { editActions, editSelectors } from '../Redux/editRedux';
import HeaderModular from '../Components/HeaderModular';

const mapStateToProps = state => ({
  isEditing: editSelectors.isEditing(state),
  editedObject: editSelectors.editedObject(state),
});

const mapActionsToProps = {
  removeTvshow: tvshowActions.removeTvshow,
  updateTvshow: tvshowActions.updateTvshow,
  toastMessage: uiActions.toastMessage,
  startEdit: editActions.startEdit,
  endEdit: editActions.endEdit,
};

function TvshowDetailsHeader({
  navigate,
  tvshowName,
  tvshowId,
  isEditing,
  editedObject,
  removeTvshow,
  updateTvshow,
  toastMessage,
  startEdit,
  endEdit,
}) {
  const handleExit = () => {
    navigate('TvshowList', {}); // Note : a goBack() would prevent Toast to stay in foreground
    Keyboard.dismiss();
    if (isEditing) {
      endEdit();
    }
  };

  const handleEdit = () => {
    startEdit();
  };

  const handleDone = () => {
    Keyboard.dismiss();
    if (editedObject.id) {
      updateTvshow(editedObject);
      toastMessage('success', `${editedObject.name} has been edited`);
    }
    endEdit();
  };

  const handleDelete = () => {
    handleExit();
    removeTvshow(tvshowId);
    toastMessage('warning', `${tvshowName} has been deleted`);
  };

  return (
    <HeaderModular
      title={tvshowName}
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
