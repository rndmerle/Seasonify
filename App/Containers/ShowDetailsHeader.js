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
  updateEdit: editActions.updateEdit,
};

export class _ShowDetailsHeader extends React.Component {
  handleExit = () => {
    this.props.navigate('ShowList', {}); // Note : a goBack() would prevent Toast to stay in foreground
    Keyboard.dismiss();
    if (this.props.isEditing) {
      this.props.endEdit();
    }
  };

  handleEdit = () => {
    this.props.startEdit();
  };

  handleDone = () => {
    this.handleExit();
    if (this.props.editedObject.id) {
      this.props.updateShow(this.props.editedObject);
      this.props.toastMessage(
        'success',
        `${this.props.editedObject.name} has been edited`,
      );
    }
  };

  handleDelete = () => {
    this.handleExit();
    this.props.removeShow(this.props.showId);
    this.props.toastMessage(
      'warning',
      `${this.props.showName} has been deleted`,
    );
  };

  render() {
    const { showName } = this.props;
    return (
      <HeaderModular
        title={showName}
        cancelButton={{ icon: 'arrow-back', action: this.handleExit }}
        actionButtons={[
          {
            visibleIf: !this.props.isEditing,
            icon: 'create',
            action: this.handleEdit,
          },
          {
            visibleIf: this.props.isEditing,
            hideByDefault: true,
            icon: 'checkmark',
            action: this.handleDone,
          },
          { icon: 'trash', action: this.handleDelete },
        ]}
      />
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(_ShowDetailsHeader);
