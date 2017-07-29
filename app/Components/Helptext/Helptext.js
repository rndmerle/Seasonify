/* @flow */
import { Content, Text } from 'native-base';
import { pure } from 'recompose';
import React from 'react';

import styles from './Helptext.style';

type Props = {
  /* parent */
  children: string | React$Element<*> | Array<*>,
  note?: boolean,
  fullscreen?: boolean,
  /* connect */
  /* HOC */
};

const enhance = pure;

function Helptext({ note = true, fullscreen = false, children }: Props) {
  return (
    <Content
      contentContainerStyle={fullscreen ? styles.fullscreenContainer : styles.container}
    >
      <Text note={note} style={fullscreen ? styles.fullscreenText : styles.text}>
        {children}
      </Text>
    </Content>
  );
}

export default enhance(Helptext);
