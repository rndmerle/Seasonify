/* @flow */
import { Spinner } from 'native-base';
import { pure } from 'recompose';
import React from 'react';

import styles from './Loading.style';

type Props = {
  /* parent */
  position?: string,
  color?: string,
  /* connect */
  isSpinning: boolean,
  /* state */
  /* handlers */
};

const enhance = pure;

function Loading({ position = 'centered', color = 'lightblue', isSpinning }: Props) {
  if (isSpinning) {
    return <Spinner style={styles[position]} color={color} />;
  }
  return null;
}

export default enhance(Loading);
