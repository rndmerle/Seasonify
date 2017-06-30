function tvshowsNormalizer(tvshows) {
  return tvshows.reduce(
    (array, suggestion) =>
      array.concat({
        allocine: suggestion.code,
        name: suggestion.originalTitle,
        localizedName: 'title' in suggestion ? suggestion.title : undefined,
        poster: 'poster' in suggestion ? suggestion.poster.href : undefined,
        year: suggestion.yearStart,
        seasons: {},
        seasonsCount: 0,
      }),
    [],
  );
}

export default tvshowsNormalizer;
