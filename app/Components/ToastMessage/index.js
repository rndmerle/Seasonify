/* @flow */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import uiState from 'State/uiState';

import ToastMessage from './ToastMessage';

export default connect(
  state => ({
    message: uiState.selectors.getMessage(state),
  }),
  dispatch => ({
    ...bindActionCreators({ messageReset: uiState.actions.messageReset }, dispatch),
    dispatch,
  }),

  // {
  //   messageReset: uiState.actions.messageReset,
  // },
)(ToastMessage);
