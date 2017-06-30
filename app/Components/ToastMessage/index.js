/* @flow */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { uiActions, uiSelectors } from 'State/uiState';

import ToastMessage from './ToastMessage';

export default connect(
  state => ({
    message: uiSelectors.getMessage(state),
  }),
  dispatch => ({
    ...bindActionCreators({ messageReset: uiActions.messageReset }, dispatch),
    dispatch,
  }),

  // {
  //   messageReset: uiActions.messageReset,
  // },
)(ToastMessage);
