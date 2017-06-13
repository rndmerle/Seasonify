// @flow
import { Image, Dimensions } from 'react-native';
import React from 'react';

import Metrics from 'Themes/Metrics';

type Props = {
  url: string,
};

type State = {
  window: Object,
  orientation: 'PORTRAIT' | 'LANDSCAPE',
};

export default class Poster extends React.Component<void, Props, State> {
  state = {
    orientation: 'PORTRAIT',
    window: Dimensions.get('window'),
  };

  componentWillMount() {
    Dimensions.addEventListener('change', this.handleDimensionsChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleDimensionsChange);
  }

  handleDimensionsChange = (dimensions: Object) => {
    this.setState({
      ...dimensions,
      orientation: dimensions.height > dimensions.width ? 'PORTRAIT' : 'LANDSCAPE',
    });
  };

  render() {
    const { url } = this.props;
    const { width } = this.state.window;
    const imageWidth = width * Metrics.columnLeft / 100;

    return (
      <Image
        source={{ uri: url }}
        resizeMode="cover"
        resizeMethod="scale"
        style={{
          height: imageWidth * Metrics.poster.averageRatio,
          width: imageWidth,
        }}
      />
    );
  }
}
