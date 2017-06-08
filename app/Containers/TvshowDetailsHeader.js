import React from 'react';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';

import ui from '../Redux/uiRedux';
import tv from '../Redux/tvshowRedux';
import editRedux from '../Redux/editRedux';
import HeaderModular from '../Components/HeaderModular';

const mapStateToProps = (state, ownProps) => ({
  isEditing: editRedux.selectors.isEditing(state),
  editedObject: editRedux.selectors.editedObject(state),
  getTvshow: tv.selectors.getTvshow(state, ownProps.tvshowId),
});

const mapActionsToProps = {
  tvshowRemove: tv.actions.tvshowRemove,
  tvshowUpdate: tv.actions.tvshowUpdate,
  messageToast: ui.actions.messageToast,
  editStart: editRedux.actions.editStart,
  editEnd: editRedux.actions.editEnd,
};

export function TvshowDetailsHeader({
  navigate,
  tvshowId,
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
    navigate('TvshowList', {}); // Note : a goBack() would prevent Toast to stay in foreground
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
