import Colors from './Colors';
import fonts from './fonts';
import Metrics from './Metrics';

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent,
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
      backgroundColor: Colors.transparent,
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin,
    },
    sectionText: {
      ...fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center',
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin,
    },
    titleText: {
      ...fonts.style.h2,
      fontSize: 14,
      color: Colors.text,
    },
  },
};

export default ApplicationStyles;
