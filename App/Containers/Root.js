import React, { Component } from 'react';
import { Container } from 'native-base';
import { connect } from 'react-redux';

import navigationLogging from '../Services/Logging';
import PersistConfig from '../Config/PersistConfig';
import StartupActions from '../Redux/StartupRedux';
import DrawerNavigation from '../Navigation/DrawerNavigation';

@connect(
  () => ({}),
  StartupActions,
)
class Root extends Component {
  componentDidMount() {
    if (!PersistConfig.active) {
      this.props.startup();
    }
  }

  render() {
    return (
      <Container /* style={styles.applicationView} */>
        <DrawerNavigation onNavigationStateChange={navigationLogging} />
      </Container>
    );
  }
}

export default Root;
