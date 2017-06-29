/* @flow */
import { connect } from 'react-redux';

import uiState from 'State/uiState';

import ToastMessage from './ToastMessage';

export default connect(
  state => ({
    message: uiState.selectors.getMessage(state),
  }),
  {
    messageHide: uiState.actions.messageHide,
  },
)(ToastMessage);
