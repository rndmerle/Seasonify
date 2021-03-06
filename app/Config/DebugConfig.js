export default {
  useFixtures: false,
  logApiCallToConsole: false,
  yellowBox: __DEV__,
  ignoredYellowBox: [
    'Warning: BackAndroid',
    'Setting a timer for',
    'Debugger and device times',
    'Unable to symbolicate stack trace',
    '%cfont-weight: bold "Value did not change.', // why-did-you-update
    'Value is a function. Possibly avoidable re-render', // why-did-you-update
  ],
  navigationLogging: false,
  PerfMonitor: false,
  PerfMonitorSettings: { waitBeforeStart: 5000, recordingDuration: 5000 },
  useReduxDevtoolsExtension: false,
  useReactotron: __DEV__, // adb reverse tcp:9090 tcp:9090
  notImportantLogs: ['Navigation Dispatch', 'Running application'], // Reactotron
};
