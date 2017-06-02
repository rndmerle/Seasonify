import seasonNormalizer from 'app/Normalizers/seasonNormalizer';

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
  seasonsRefresh: (id, silent = false) => ({
    type: types.SEASONS_REFRESH,
    payload: { id, silent },
  }),
  seasonsSuccess: (id, seasons) => ({
    type: types.SEASONS_SUCCESS,
    payload: { id, seasons },
  }),
  seasonsFail: () => ({ type: types.SEASONS_FAIL }),
};

export const INITIAL_STATE = __DEV__
  ? require('app/Fixtures/tvshowState.json')
  : {};

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
  getTvshow: (state, id) => state.tvshows[id],
};
