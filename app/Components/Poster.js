// @flow
import React from 'react';
import FitImage from 'react-native-fit-image';

const Poster = ({ url }: { url: string }) =>
  (<FitImage
    source={{ uri: url }}
    resizeMode="contain"
    resizeMethod="scale"
    // indicator
    // indicatorColor="#919191"
    // indicatorSize="large"
  />);

export default Poster;
