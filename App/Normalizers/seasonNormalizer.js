function normalizeSeasons(seasons) {
  return seasons.reduce((obj, season) => {
    if (season.seasonNumber === 0) {
      return obj;
    }
    return {
      ...obj,
      [season.seasonNumber]: {
        id: season.seasonNumber,
        year: season.yearEnd,
        episodes: season.episodeCount,
        allocine: season.code,
      },
    };
  }, {});
}

export default normalizeSeasons;
