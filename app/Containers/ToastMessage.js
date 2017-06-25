/* @flow */
import { Toast } from 'native-base';
import { connect } from 'react-redux';
import React from 'react';

import type { Message } from 'Types';
import Messages from 'Config/Messages';
import ui from 'State/uiState';

const mapStateToProps = state => ({
  message: ui.selectors.getMessage(state),
});

const mapActionsToProps = {
  messageHide: ui.actions.messageHide,
};

type Props = {
  message: Message,
  messageHide: Function,
};

export class ToastMessage extends React.Component<void, Props, void> {
  componentWillReceiveProps({
    message,
    messageHide,
  }: {
    message: Message,
    messageHide: Function,
  }) {
    if (message) {
      const messageConfig = Messages[message.level];

      setTimeout(() => {
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
