/* @flow */
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import React from 'react';

import ui from 'State/uiState';

import styles from './styles/Loading.style';

const enhance = connect(
  state => ({
    isSpinning: ui.selectors.isSpinning(state),
  }),
  {},
);

export function Loading({
  isSpinning,
  position = 'centered',
  color = 'lightblue',
}: {
  isSpinning: boolean,
  position?: string,
  color?: string,
}) {
  if (isSpinning) {
    return <Spinner style={styles[position]} color={color} />;
  }
  return null;
}

export default enhance(Loading);
