/* @flow */
import { Text } from 'native-base';
import { branch, compose, lifecycle, renderNothing } from 'recompose';
import React from 'react';

import type { Message } from 'Types';
import Messages from 'Config/Messages';

type Props = {
  /* connect */
  message: Message,
  messageHide: Function,
};

export function componentWillReceiveProps({ message, messageHide }: Props) {
  if (message) {
    const messageConfig = Messages[message.level];

    setTimeout(() => {
      messageHide();
    }, messageConfig.duration);
    // Toast.show({ ...messageConfig, text: message.text });
  }
}

const enhance = compose(
  lifecycle({
    componentWillReceiveProps,
  }),
  branch(({ message }: Props) => !message || !message.text, renderNothing),
);

function ToastMessage({ message: { text } }: Props) {
  return (
    <Text>
      {text}
    </Text>
  );
}

export default enhance(ToastMessage);
