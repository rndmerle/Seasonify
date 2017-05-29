// DOC : https://wiki.gromez.fr/dev/api/allocine_v3

import jshashes from 'jshashes';
import axios from 'axios';

const config = {
  apiHostName: 'http://api.allocine.fr',
  apiBasePath: '/rest/v3/',
  apiPartner: '100043982026',
  apiSecretKey: '29d185d98c984a359e6e6f26a0474269',
  imgBaseUrl: 'http://images.allocine.fr',
};

const presets = {
  global: {
    format: 'json',
    partner: config.apiPartner,
  },
  tvserieslist: { filter: 'top', order: 'viewcount' },
  tvseries: { profile: 'large' },
  tvseriesbroadcastlist: { profile: 'large' },
  season: { profile: 'large' },
  seasonlist: { profile: 'small' },
  search: { filter: 'tvseries', count: 5 },
};

const sha1 = new jshashes.SHA1();

const todayDate = () => {
  const date = new Date();
  return (
    date.getFullYear() +
    ('0' + (date.getMonth() + 1)).slice(-2) + // eslint-disable-line prefer-template
    ('0' + date.getDate()).slice(-2) // eslint-disable-line prefer-template
  );
};

const buildPath = (route, specificParams) => {
  const Url = config.apiBasePath + route;

  const params = Object.assign(
    {},
    presets.global,
    presets[route],
    specificParams,
  );

  const paramsString = Object.keys(params)
    .map(key => [key, params[key]].map(encodeURIComponent).join('='))
    .join('&');

  const sed = todayDate();

  const sig = `${config.apiSecretKey}${paramsString}&sed=${sed}`;
  const encodedSig = encodeURIComponent(sha1.b64(sig));

  return `${Url}?${paramsString}&sed=${sed}&sig=${encodedSig}`;
};

export default function apiShow(method, options) {
  const path = buildPath(method, options);
  return axios.get(config.apiHostName + path);
}

export function searchShow(query) {
  return apiShow('search', { q: query });
}
