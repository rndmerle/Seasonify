export default {
  useFixtures: false,
  yellowBox: __DEV__,
  ignoredYellowBox: [
    'Warning: BackAndroid',
    'Setting a timer for',
    'Debugger and device times',
    'Unable to symbolicate stack trace',
    '[...effects]',
  ],
  reduxLogging: __DEV__,
  navigationLogging: false,
  useReduxDevtoolsExtension: __DEV__,
  useReactotron: false, // adb reverse tcp:9090 tcp:9090
  notImportantLogs: ['Navigation Dispatch', 'Running application'],
};
