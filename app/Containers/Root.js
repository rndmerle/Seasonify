/* @flow */
import { Container } from 'native-base';
import { connect } from 'react-redux';
import PerfMonitor from 'react-native/Libraries/Performance/RCTRenderingPerf';
import React from 'react';

import DebugConfig from 'Config/DebugConfig';
import DrawerNavigation from 'Navigation/DrawerNavigation';
import PersistConfig from 'Config/PersistConfig';
import navigationLogging from 'Libs/Logging';
import ui from 'State/uiState';

import ToastMessage from './ToastMessage';

const mapStateToProps = null; // state => ({});

const mapActionsToProps = {
  startup: ui.actions.startup,
};

type Props = {
  startup: Function,
};

export class Root extends React.Component<void, Props, void> {
  componentDidMount() {
    /* istanbul ignore next */
    if (!PersistConfig.active) {
      this.props.startup();
    }
    /* istanbul ignore next */
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
