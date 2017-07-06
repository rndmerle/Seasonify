export default {
  seasonHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // not-working, so using alignSelf
  },
  seasonButton: {},
  seasonTitle: {
    // alignSelf: 'flex-end',
    flexGrow: 1,
    textAlign: 'right',
  },
  seasonInfos: {
    // alignSelf: 'flex-end',
    flexBasis: '100%',
    textAlign: 'right',
  },
  viewerList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start', // not-working, so using alignSelf
    paddingHorizontal: 20,
  },
  viewer: {
    alignSelf: 'flex-start',
    marginHorizontal: 2,
    marginVertical: 2,
  },
};
