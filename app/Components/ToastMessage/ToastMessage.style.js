import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: 50,
    justifyContent: 'center',
  },

  // eslint-disable-next-line react-native/no-unused-styles
  neutral: {
    backgroundColor: '#0091ea',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  success: {
    backgroundColor: '#00c853',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  warning: {
    backgroundColor: '#ffab00',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  error: {
    backgroundColor: '#d50000',
  },

  text: {
    color: 'white',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
