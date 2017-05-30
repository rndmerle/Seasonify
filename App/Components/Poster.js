import React from 'react';
import { Image } from 'react-native';

const Poster = ({ url, adaptative = true }) => (
  <Image
    resizeMode="contain"
    resizeMethod="scale"
    style={
      adaptative && {
        flex: 1,
        height: undefined,
        width: undefined,
      }
    }
    source={{ uri: url }}
  />
);

export default Poster;
