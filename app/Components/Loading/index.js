/* @flow */
import { connect } from 'react-redux';

import { uiSelectors } from 'State/uiState';

import Loading from './Loading';

export default connect(
  state => ({
    isSpinning: uiSelectors.isSpinning(state),
  }),
  {},
)(Loading);
