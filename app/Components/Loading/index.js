/* @flow */
import { connect } from 'react-redux';

import uiState from 'State/uiState';

import Loading from './Loading';

export default connect(
  state => ({
    isSpinning: uiState.selectors.isSpinning(state),
  }),
  {},
)(Loading);
