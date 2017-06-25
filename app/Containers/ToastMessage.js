/* @flow */
import { Toast } from 'native-base';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import type { Message } from 'Types';
import Messages from 'Config/Messages';
import ui from 'State/uiState';

export function componentWillReceiveProps({
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

const enhance = compose(
  connect(
    state => ({
      message: ui.selectors.getMessage(state),
    }),
    {
      messageHide: ui.actions.messageHide,
    },
  ),
  lifecycle({
    componentWillReceiveProps,
  }),
);

export function ToastMessage() {
  return null;
}

export default enhance(ToastMessage);
