function tvshowsNormalizer(tvshows) {
  return tvshows.reduce(
    (array, suggestion) =>
      array.concat({
        allocine: suggestion.code,
        name: suggestion.originalTitle,
        localizedName: 'title' in suggestion ? suggestion.title : '',
        poster: 'poster' in suggestion ? suggestion.poster.href : '',
        year: suggestion.yearStart,
        seasons: {},
      }),
    [],
  );
}

export default tvshowsNormalizer;
