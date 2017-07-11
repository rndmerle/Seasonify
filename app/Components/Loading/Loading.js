/* @flow */
import { Spinner } from 'native-base';
import { pure } from 'recompose';
import React from 'react';

import styles from './Loading.style';

type Props = {
  /* parent */
  position?: string,
  color?: string,
  isSpinning?: boolean,
  /* connect */
  /* HOC */
};

const enhance = pure;

function Loading({
  position = 'centered',
  color = 'lightblue',
  isSpinning = true,
}: Props) {
  if (isSpinning) {
    return <Spinner style={styles[position]} color={color} />;
  }
  return null;
}

export default enhance(Loading);
