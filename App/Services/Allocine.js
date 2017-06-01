// DOC : https://wiki.gromez.fr/dev/api/allocine_v3

import jshashes from 'jshashes';
import axios from 'axios';

export default class Allocine {
  config = {
    apiHostName: 'http://api.allocine.fr',
    apiBasePath: '/rest/v3/',
    apiPartner: '100043982026',
    apiSecretKey: '29d185d98c984a359e6e6f26a0474269',
    imgBaseUrl: 'http://images.allocine.fr',
  };

  presets = {
    global: {
      format: 'json',
      partner: this.config.apiPartner,
    },
    search: { filter: 'tvseries', count: 5 },
    tvseries: { profile: 'large' },
    season: { profile: 'medium' },
  };

  sha1 = null;

  constructor() {
    this.sha1 = new jshashes.SHA1();
  }

  todayDate = () => {
    const date = new Date();
    return (
      date.getFullYear() +
      ('0' + (date.getMonth() + 1)).slice(-2) + // eslint-disable-line prefer-template
      ('0' + date.getDate()).slice(-2) // eslint-disable-line prefer-template
    );
  };

  buildPath = (route, specificParams) => {
    const Url = this.config.apiBasePath + route;

    const params = Object.assign(
      {},
      this.presets.global,
      this.presets[route],
      specificParams,
    );

    const paramsString = Object.keys(params)
      .map(key => [key, params[key]].map(encodeURIComponent).join('='))
      .join('&');

    const sed = this.todayDate();

    const sig = `${this.config.apiSecretKey}${paramsString}&sed=${sed}`;
    const encodedSig = encodeURIComponent(this.sha1.b64(sig));

    return `${Url}?${paramsString}&sed=${sed}&sig=${encodedSig}`;
  };

  api = (method, options) => {
    const path = this.buildPath(method, options);
    axios
      .get(this.config.apiHostName + path)
      .then(result => ({ error: null, data: result.data }))
      .catch(error => ({ error: error.message, data: null }));
  };

  searchTvshows = query => {
    if (query.trim() === '') {
      return { error: null, data: [] };
    }
    const path = this.buildPath('search', { q: query });
    return axios
      .get(this.config.apiHostName + path)
      .then(result => ({
        error: null,
        data: result.data.feed && result.data.feed.tvseries
          ? result.data.feed.tvseries
          : [],
      }))
      .catch(error => ({ error: error.message, data: null }));
  };

  getSeasons = code => {
    const path = this.buildPath('tvseries', { code });
    return axios
      .get(this.config.apiHostName + path)
      .then(result => {
        if (!result.data.tvseries) {
          return { error: "API didn't found TV tvshow", data: null };
        } else if (
          !result.data.tvseries.season ||
          result.data.tvseries.season === []
        ) {
          return { error: 'No seasons for this TV tvshow', data: null };
        }
        return {
          error: null,
          data: result.data.tvseries.season,
        };
      })
      .catch(error => ({ error: error.message, data: null }));
  };
}

/* ========== FIXTURES ========== */

export const ApiFixtures = {
  searchTvshows: query => {
    if (query.trim() === '') {
      return { error: null, data: [] };
    }
    return {
      error: null,
      data: require('../Fixtures/tvshowsSearch.json'),
    };
  },

  getSeasons: () => ({
    error: null,
    data: require('../Fixtures/seasonsRequest.json'),
  }),
};
