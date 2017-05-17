export default {
  useFixtures: true,
  // ezLogin: false,
  yellowBox: __DEV__,
  ignoredYellowBox: ['Warning: BackAndroid', 'Setting a timer for'],
  notImportantLogs: ['Navigation Dispatch', 'Running application'],
  reduxLogging: __DEV__,
  useReactotron: false, // adb reverse tcp:9090 tcp:9090
  useReduxDevtoolsExtension: __DEV__,
};
