export default {
  searchTvshows: query => {
    if (query.trim() === '') {
      return { error: null, data: [] };
    }
    return {
      error: null,
      data: require('../Fixtures/apiSearchHappy.json'),
    };
  },

  getSeasons: () => ({
    error: null,
    data: require('../Fixtures/apiSeasonsDeadwood.json'),
  }),
};
