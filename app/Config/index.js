import React from 'react';
import DebugConfig from './DebugConfig';
import AppConfig from './AppConfig';

export default () => {
  if (__DEV__) {
    console.disableYellowBox = !DebugConfig.yellowBox;
    console.ignoredYellowBox = DebugConfig.ignoredYellowBox;

    if (DebugConfig.whyDidYouUpdate) {
      const { whyDidYouUpdate } = require('why-did-you-update');
      whyDidYouUpdate(React, { exclude: /^YellowBox/ });
    }
  }
};
