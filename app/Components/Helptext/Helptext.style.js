import { fonts } from 'Themes';

export default {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  fullscreenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontStyle: 'italic',
    textAlign: 'left',
    fontSize: fonts.size.infos,
  },
  fullscreenText: {
    fontStyle: 'italic',
    paddingHorizontal: 40,
    textAlign: 'center',
    fontSize: fonts.size.infos,
  },
};
