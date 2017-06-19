/* @flow */
import { Image } from 'react-native';
import React from 'react';

import withResponsive from 'HOC/withResponsive';
import Metrics from 'Themes/Metrics';

const enhance = withResponsive;

export function Poster({
  url,
  orientation,
  window,
}: {
  url: string,
  orientation: 'PORTRAIT' | 'LANDSCAPE',
  window: Object,
}) {
  const imageWidth = window.width * Metrics.columnLeft / 100;

  return (
    <Image
      source={{ uri: url }}
      resizeMode="cover"
      resizeMethod="scale"
      orientation={orientation}
      style={{
        height: imageWidth * Metrics.poster.averageRatio,
        width: imageWidth,
      }}
    />
  );
}

export default enhance(Poster);
