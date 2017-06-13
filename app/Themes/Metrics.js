import { Dimensions, Platform } from 'react-native';

const { screenWidth, screenHeight, screenScale } = Dimensions.get('window');

const metrics = {
  screenWidth,
  screenHeight,
  screenScale,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  searchBarHeight: 30,
  horizontalLineHeight: 1,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  columnLeft: 38,
  columnRight: 62,
  poster: {
    averageRatio: 400 / 300,
  },
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
  },
};

export default metrics;
