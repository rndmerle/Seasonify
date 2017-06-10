import React from 'react';
import DebugConfig from './DebugConfig';

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
