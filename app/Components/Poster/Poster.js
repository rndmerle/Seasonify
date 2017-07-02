/* @flow */
import { Image } from 'react-native';
import { compose, pure } from 'recompose';
import React from 'react';

import withResponsive from 'HOC/withResponsive';
import Metrics from 'Themes/Metrics';

type Props = {
  /* parent */
  url: string,
  orientation: 'PORTRAIT' | 'LANDSCAPE',
  window: Object,
  /* connect */
  /* HOC */
};

const enhance = compose(pure, withResponsive);

function Poster({ url, orientation, window }: Props) {
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
