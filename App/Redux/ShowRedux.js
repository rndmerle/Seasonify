import Ident from '../Services/Ident';

/* ========== TYPES ========== */
export const types = {
  ADD: 'SHOW/ADD',
  REMOVE: 'SHOW/REMOVE',
  UPDATE: 'SHOW/UPDATE',
  SEASONS_REFRESH: 'SHOW/SEASON_REFRESH',
  SEASONS_SUCCESS: 'SHOW/SEASON_SUCCESS',
  SEASONS_FAIL: 'SHOW/SEASON_FAIL',
};

/* ========== ACTIONS ========== */
export const showActions = {
  addShow: show => ({
    type: types.ADD,
    payload: show,
  }),
  removeShow: id => ({ type: types.REMOVE, payload: { id } }),
  updateShow: show => ({ type: types.UPDATE, payload: show }),
  seasonsRefresh: (id, allocine) => ({
    type: types.SEASONS_REFRESH,
    payload: { id, allocine },
  }),
  seasonsSuccess: (id, seasons) => ({
    type: types.SEASONS_SUCCESS,
    payload: { id, seasons },
  }),
  seasonsFail: () => ({ type: types.SEASONS_FAIL }),
};

Ident.newid();
export const INITIAL_STATE = {
  [Ident.id()]: {
    id: Ident.id(),
    allocine: 213,
    name: 'Deadwood',
    frenchName: null,
    year: '2004',
    poster: 'http://fr.web.img5.acsta.net/medias/nmedia/18/82/49/12/19623049.jpg',
    seasons: {},
  },
};

/* ========== Normalizing ========== */

const normalizeSeasons = seasons =>
  seasons.reduce((obj, season) => {
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

/* ========== REDUCER ========== */
const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.ADD:
      Ident.newid();
      return {
        ...state,
        [Ident.id()]: { id: Ident.id(), seasons: {}, ...payload },
      };

    case types.REMOVE:
      const { [payload.id]: deleted, ...newState } = state;
      return newState;

    case types.UPDATE:
      return { ...state, [payload.id]: { ...state[payload.id], ...payload } };

    case types.SEASONS_SUCCESS:
      const newSeasons = normalizeSeasons(payload.seasons);
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          seasons: { ...state[payload.id].seasons, ...newSeasons },
        },
      };

    default:
      return state;
  }
};
export default reducer;

/* ========== SELECTORS ========== */
export const showSelectors = {
  getShows: state => state.shows,
};
