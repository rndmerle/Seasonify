import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'native-base';

import styles from './styles/Loading.style';
import { uiSelectors } from '../Redux/uiRedux';

const mapStateToProps = state => ({
  isSpinning: uiSelectors.isSpinning(state),
});

const mapActionsToProps = {};

function TvshowDetails({ isSpinning, color }) {
  if (isSpinning) {
    return <Spinner style={styles.nextToFAB} color={color} />;
  }
  return null;
}

export default connect(mapStateToProps, mapActionsToProps)(TvshowDetails);
