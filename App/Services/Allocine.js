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
    tvserieslist: { filter: 'top', order: 'viewcount' },
    tvseries: { profile: 'large' },
    tvseriesbroadcastlist: { profile: 'large' },
    season: { profile: 'large' },
    seasonlist: { profile: 'small' },
    search: { filter: 'tvseries', count: 5 },
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

  apiShow = (method, options) => {
    const path = this.buildPath(method, options);
    return axios.get(this.config.apiHostName + path);
  };

  searchShow = query => this.apiShow('search', { q: query });
}
