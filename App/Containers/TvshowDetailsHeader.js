import React from 'react';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';

import { uiActions } from 'app/Redux/uiRedux';
import { tvshowSelectors, tvshowActions } from 'app/Redux/tvshowRedux';
import { editActions, editSelectors } from 'app/Redux/editRedux';
import HeaderModular from 'app/Components/HeaderModular';

const mapStateToProps = (state, ownProps) => ({
  isEditing: editSelectors.isEditing(state),
  editedObject: editSelectors.editedObject(state),
  getTvshow: tvshowSelectors.getTvshow(state, ownProps.tvshowId),
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
  tvshowId,
  isEditing,
  editedObject,
  getTvshow,
  removeTvshow,
  updateTvshow,
  toastMessage,
  startEdit,
  endEdit,
}) {
  const tvshow = getTvshow;

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
    removeTvshow(tvshow.id);
    toastMessage('warning', `${tvshow.name} has been deleted`);
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
