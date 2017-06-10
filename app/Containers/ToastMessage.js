import React from 'react';
import { connect } from 'react-redux';
import { Toast } from 'native-base';

import ui from 'State/uiState';
import Messages from 'Config/Messages';

const mapStateToProps = state => ({
  message: ui.selectors.getMessage(state),
});

const mapActionsToProps = {
  messageHide: ui.actions.messageHide,
};

export class ToastMessage extends React.Component {
  componentWillReceiveProps({ message, messageHide }) {
    if (message) {
      const messageConfig = Messages[message.level];

      this.hideTimeout = setTimeout(() => {
        messageHide();
      }, messageConfig.duration);
      Toast.show({ ...messageConfig, text: message.text });
    }
  }

  render() {
    return null;
  }
}

export default connect(mapStateToProps, mapActionsToProps)(ToastMessage);
