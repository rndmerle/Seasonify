export default {
  useFixtures: false,
  yellowBox: __DEV__,
  ignoredYellowBox: [
    'Warning: BackAndroid',
    'Setting a timer for',
    'Debugger and device times',
    'Unable to symbolicate stack trace',
    '[...effects]', // saga ?
    '%cfont-weight: bold "Value did not change.', // why-did-you-update
    'Value is a function. Possibly avoidable re-render', // why-did-you-update
  ],
  reduxLogging: __DEV__,
  navigationLogging: false,
  whyDidYouUpdate: false,
  PerfMonitor: false,
  PerfMonitorSettings: { waitBeforeStart: 0, recordingDuration: 10000 },
  useReduxDevtoolsExtension: __DEV__,
  useReactotron: false, // adb reverse tcp:9090 tcp:9090
  notImportantLogs: ['Navigation Dispatch', 'Running application'], // Reactotron
};
