export default {
  seasonHeader: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end', // not-working, so using alignSelf
  },
  seasonTitle: {
    alignSelf: 'flex-end',
  },
  seasonInfos: {
    alignSelf: 'flex-end',
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
