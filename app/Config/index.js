import DebugConfig from './DebugConfig';
import AppConfig from './AppConfig';

export default () => {
  if (__DEV__) {
    console.disableYellowBox = !DebugConfig.yellowBox;
    console.ignoredYellowBox = DebugConfig.ignoredYellowBox;
  }
};
