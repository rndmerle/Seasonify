import React from 'react';
import { Container } from 'native-base';
import { connect } from 'react-redux';

import navigationLogging from 'app/Services/Logging';
import PersistConfig from 'app/Config/PersistConfig';
import DrawerNavigation from 'app/Navigation/DrawerNavigation';
import { startupActions } from 'app/Redux/startupRedux';
import ToastMessage from './ToastMessage';

const mapStateToProps = null; // state => ({});

const mapActionsToProps = {
  startup: startupActions.startup,
};

export class Root extends React.Component {
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
