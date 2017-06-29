import DebugConfig from './DebugConfig';

export default () => {
  if (__DEV__) {
    console.disableYellowBox = !DebugConfig.yellowBox;
    console.ignoredYellowBox = DebugConfig.ignoredYellowBox;
  }
};
