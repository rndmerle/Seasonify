import React from 'react';
import { connect } from 'react-redux';
import { Toast } from 'native-base';

import { uiSelectors, uiActions } from '../Redux/uiRedux';
import Messages from '../Config/Messages';

const mapStateToProps = state => ({
  message: uiSelectors.getMessage(state),
});

const mapActionsToProps = {
  hideMessage: uiActions.hideMessage,
};

export class ToastMessage extends React.Component {
  componentWillReceiveProps({ message, hideMessage }) {
    if (message) {
      const messageConfig = Messages[message.type];

      this.hideTimeout = setTimeout(() => {
        hideMessage();
      }, messageConfig.duration);
      Toast.show({ ...messageConfig, text: message.text });
    }
  }

  render() {
    return null;
  }
}

export default connect(mapStateToProps, mapActionsToProps)(ToastMessage);
