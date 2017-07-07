/* @flow */
import { Container } from 'native-base';
import { connect } from 'react-redux';
import PerfMonitor from 'react-native/Libraries/Performance/RCTRenderingPerf';
import React from 'react';

import { uiActions } from 'Store/uiStore';
import DebugConfig from 'Config/DebugConfig';
import DrawerNavigation from 'Navigation/DrawerNavigation';
import PersistConfig from 'Config/PersistConfig';
import ToastMessage from 'Components/ToastMessage';
import navigationLogging from 'Libs/Logging';

const mapStateToProps = null; // state => ({});

const mapActionsToProps = {
  startup: uiActions.startup,
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
      /* eslint-disable no-console */
      console.log(
        `Starting logging in ${DebugConfig.PerfMonitorSettings.waitBeforeStart / 1000}s`,
      );
      setTimeout(() => {
        console.log(
          `Logging STARTING (ends in ${DebugConfig.PerfMonitorSettings.recordingDuration /
            1000}s)`,
        );
        /* eslint-enable no-console */
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
        <DrawerNavigation onNavigationStateChange={navigationLogging} />
        <ToastMessage />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Root);
