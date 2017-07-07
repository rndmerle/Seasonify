/* @flow */

export default {
  searchTvshows: (query: string): ApiResponse => {
    if (query.trim() === '') {
      return { error: null, data: [] };
    }
    return {
      error: null,
      data: require('Fixtures/apiSearchHappy.json'),
    };
  },

  getSeasons: (): ApiResponse => ({
    error: null,
    data: require('Fixtures/apiSeasonsDeadwood.json'),
  }),
};
