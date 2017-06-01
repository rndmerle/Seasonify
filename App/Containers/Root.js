import React from 'react';
import { Container } from 'native-base';
import { connect } from 'react-redux';

import navigationLogging from '../Services/Logging';
import PersistConfig from '../Config/PersistConfig';
import DrawerNavigation from '../Navigation/DrawerNavigation';
import ToastMessage from './ToastMessage';
import { startupActions } from '../Redux/startupRedux';

const mapStateToProps = state => ({
  message: state.ui.message,
});

const mapActionsToProps = {
  startup: startupActions.startup,
};

class Root extends React.Component {
  componentDidMount() {
    if (!PersistConfig.active) {
      this.props.startup();
    }
  }

  render() {
    return (
      <Container>
        <ToastMessage />
        <DrawerNavigation onNavigationStateChange={navigationLogging} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Root);
