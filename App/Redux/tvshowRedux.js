import seasonNormalizer from '../Normalizers/seasonNormalizer';
import Ident from '../Services/Ident';

/* ========== TYPES ========== */
export const types = {
  ADD: 'SHOW/ADD',
  ADD_WITH_SEASONS: 'SHOW/ADD_WITH_SEASONS',
  REMOVE: 'SHOW/REMOVE',
  UPDATE: 'SHOW/UPDATE',
  SEASONS_REFRESH: 'SHOW/SEASON_REFRESH',
  SEASONS_SUCCESS: 'SHOW/SEASON_SUCCESS',
  SEASONS_FAIL: 'SHOW/SEASON_FAIL',
};

/* ========== ACTIONS ========== */
export const tvshowActions = {
  addTvshowWithSeasons: tvshow => ({
    type: types.ADD_WITH_SEASONS,
    payload: tvshow,
  }),
  addTvshow: tvshow => ({
    type: types.ADD,
    payload: tvshow,
  }),
  removeTvshow: id => ({ type: types.REMOVE, payload: { id } }),
  updateTvshow: tvshow => ({ type: types.UPDATE, payload: tvshow }),
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
    year: 2004,
    poster: 'http://fr.web.img5.acsta.net/medias/nmedia/18/82/49/12/19623049.jpg',
    seasons: {
      1: {
        id: 1,
        allocine: 565,
        year: 2004,
        episodes: 12,
      },
      2: {
        id: 2,
        allocine: 711,
        year: 2005,
        episodes: 12,
      },
      3: {
        id: 3,
        allocine: 2664,
        year: 2006,
        episodes: 12,
      },
    },
  },
};

/* ========== REDUCER ========== */
const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.ADD:
      return {
        ...state,
        [payload.id]: { seasons: {}, ...payload },
      };

    case types.REMOVE:
      const { [payload.id]: deleted, ...newState } = state;
      return newState;

    case types.UPDATE:
      return { ...state, [payload.id]: { ...state[payload.id], ...payload } };

    case types.SEASONS_SUCCESS:
      const newSeasons = seasonNormalizer(payload.seasons);
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
export const tvshowSelectors = {
  getTvshows: state => state.tvshows,
};
