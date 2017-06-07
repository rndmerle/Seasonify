function tvshowNormalizer(tvshows) {
  return tvshows.reduce(
    (array, suggestion) =>
      array.concat({
        allocine: suggestion.code,
        name: suggestion.originalTitle,
        localizedName: 'title' in suggestion ? suggestion.title : null,
        poster: 'poster' in suggestion ? suggestion.poster.href : null,
        year: suggestion.yearStart,
      }),
    [],
  );
}

export default tvshowNormalizer;
