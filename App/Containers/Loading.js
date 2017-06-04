import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'native-base';

import { uiSelectors } from 'app/Redux/uiRedux';
import styles from './styles/Loading.style';

const mapStateToProps = state => ({
  isSpinning: uiSelectors.isSpinning(state),
});

const mapActionsToProps = {};

export function Loading({ isSpinning, color }) {
  if (isSpinning) {
    return <Spinner style={styles.nextToFAB} color={color} />;
  }
  return null;
}

export default connect(mapStateToProps, mapActionsToProps)(Loading);
