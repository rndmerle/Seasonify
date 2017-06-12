import React from 'react';
import PerfMonitor from 'react-native/Libraries/Performance/RCTRenderingPerf';
import { Container } from 'native-base';
import { connect } from 'react-redux';

import navigationLogging from 'Libs/Logging';
import PersistConfig from 'Config/PersistConfig';
import DebugConfig from 'Config/DebugConfig';
import DrawerNavigation from 'Navigation/DrawerNavigation';
import ui from 'State/uiState';
import ToastMessage from './ToastMessage';

const mapStateToProps = null; // state => ({});

const mapActionsToProps = {
  startup: ui.actions.startup,
};

export class Root extends React.Component {
  componentDidMount() {
    if (!PersistConfig.active) {
      this.props.startup();
    }
    if (DebugConfig.PerfMonitor) {
      PerfMonitor.toggle();
      setTimeout(() => {
        PerfMonitor.start();
        setTimeout(() => {
          PerfMonitor.stop();
        }, DebugConfig.PerfMonitorSettings.recordingDuration);
      }, DebugConfig.PerfMonitorSettings.waitBeforeStart);
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
