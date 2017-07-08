function seasonsNormalizer(seasons) {
  return seasons.reduce((obj, season) => {
    if (season.seasonNumber === 0) {
      return obj;
    }
    return {
      ...obj,
      [parseInt(season.seasonNumber, 10)]: {
        id: season.seasonNumber,
        year: season.yearEnd,
        episodes: season.episodeCount,
        allocine: season.code,
      },
    };
  }, {});
}

export default seasonsNormalizer;
