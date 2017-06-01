import React from 'react';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';

import { showActions } from '../Redux/showRedux';
import { uiActions } from '../Redux/uiRedux';
import { editActions, editSelectors } from '../Redux/editRedux';
import HeaderModular from '../Components/HeaderModular';

const mapStateToProps = state => ({
  isEditing: editSelectors.isEditing(state),
  editedObject: editSelectors.editedObject(state),
});

const mapActionsToProps = {
  removeShow: showActions.removeShow,
  updateShow: showActions.updateShow,
  toastMessage: uiActions.toastMessage,
  startEdit: editActions.startEdit,
  endEdit: editActions.endEdit,
};

function ShowDetailsHeader({
  navigate,
  showName,
  showId,
  isEditing,
  editedObject,
  removeShow,
  updateShow,
  toastMessage,
  startEdit,
  endEdit,
}) {
  const handleExit = () => {
    navigate('ShowList', {}); // Note : a goBack() would prevent Toast to stay in foreground
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
      updateShow(editedObject);
      toastMessage('success', `${editedObject.name} has been edited`);
    }
    endEdit();
  };

  const handleDelete = () => {
    handleExit();
    removeShow(showId);
    toastMessage('warning', `${showName} has been deleted`);
  };

  return (
    <HeaderModular
      title={showName}
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

export default connect(mapStateToProps, mapActionsToProps)(ShowDetailsHeader);
