import colors from './colors';
import fonts from './fonts';
import Metrics from './Metrics';

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: colors.transparent,
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: colors.transparent,
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin,
    },
    sectionText: {
      ...fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center',
    },
    subtitle: {
      color: colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin,
    },
    titleText: {
      ...fonts.style.h2,
      fontSize: 14,
      color: colors.text,
    },
  },
};

export default ApplicationStyles;
