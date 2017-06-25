/* @flow */
/* eslint-disable no-use-before-define */
import axios from 'axios';
import jshashes from 'jshashes';

import type { ApiResponse, ApiPromise } from 'Types';
import DebugConfig from 'Config/DebugConfig';

// DOC : https://wiki.gromez.fr/dev/api/allocine_v3
export class Allocine {
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

  sha1 = new jshashes.SHA1();

  static removeDynamicData(field: string, data: Array<Object>): Array<Object> {
    return data.map(tvshow => {
      const { [field]: deleted, ...newTvShowContent } = tvshow;

      return { ...newTvShowContent };
    });
  }

  todayDate = (): string => {
    const date = new Date();
    return (
      date.getFullYear() +
      ('0' + (date.getMonth() + 1)).slice(-2) + // eslint-disable-line prefer-template
      ('0' + date.getDate()).slice(-2) // eslint-disable-line prefer-template
    );
  };

  buildPath = (route: string, specificParams: Object) => {
    const Url: string = this.config.apiBasePath + route;

    const params: Object = Object.assign(
      {},
      this.presets.global,
      this.presets[route],
      specificParams,
    );

    const paramsString: string = Object.keys(params)
      .map(key => [key, params[key]].map(encodeURIComponent).join('='))
      .join('&');

    const sed: string = this.todayDate();

    const sig: string = `${this.config.apiSecretKey}${paramsString}&sed=${sed}`;
    const encodedSig: string = encodeURIComponent(this.sha1.b64(sig));

    return `${Url}?${paramsString}&sed=${sed}&sig=${encodedSig}`;
  };

  get = (method: string, options: Object): Promise<*> => {
    const path: string = this.buildPath(method, options);
    /* istanbul ignore next */
    if (DebugConfig.logApiCallToConsole) {
      console.log('Allocine call: ', this.config.apiHostName + path); // eslint-disable-line no-console
    }
    return axios.get(this.config.apiHostName + path);
    // .then(result => ({ error: null, data: result.data }))
    // .catch(error => ({ error: error.message, data: null }));
  };
}

const api = new Allocine();

/* ========== API CALLS ========== */

export default {
  class: api,
  searchTvshows: (query: string): ApiResponse | ApiPromise => {
    if (query.trim() === '') {
      return { error: null, data: [] };
    }
    return api
      .get('search', { q: query })
      .then(result => ({
        error: null,
        data: result.data.feed && result.data.feed.tvseries
          ? Allocine.removeDynamicData('statistics', result.data.feed.tvseries)
          : [],
      }))
      .catch(error => ({ error: error.message, data: null }));
  },

  getSeasons: (code: number): ApiPromise =>
    api
      .get('tvseries', { code })
      .then(result => {
        if (!result.data.tvseries) {
          return { error: "API didn't found the TV show", data: null };
        }
        const data: Array<Object> = Allocine.removeDynamicData(
          'statistics',
          result.data.tvseries.season,
        );
        return {
          error: null,
          data,
        };
      })
      .catch(error => ({ error: error.message, data: null })),
};
