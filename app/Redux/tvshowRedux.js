import { createReducer, createActions } from 'reduxsauce';
import seasonsNormalizer from '../Normalizers/seasonsNormalizer';

/* ========== ACTIONS ========== */

const { Types: types, Creators } = createActions({
  // a parameter named 'type' is forbidden
  tvshowAddWithSeasons: ['tvshow'],
  tvshowAdd: ['tvshow'],
  tvshowRemove: ['id'],
  tvshowUpdate: ['tvshow'],
  seasonsRefresh: ['id', 'silent'],
  seasonsSuccess: ['id', 'seasons'],
  seasonsFail: null,
});

/* ========== REDUCERS ========== */

export const tvshowAdd = (state, { tvshow }) => ({
  ...state,
  [tvshow.id]: { seasons: {}, ...tvshow },
});

export const tvshowRemove = (state, { id }) => {
  const { [id]: deleted, ...newState } = state;
  return newState;
};

export const tvshowUpdate = (state, { tvshow }) => ({
  ...state,
  [tvshow.id]: { ...state[tvshow.id], ...tvshow },
});

export const seasonsSuccess = (state, { id, seasons }) => {
  const newSeasons = seasonsNormalizer(seasons);
  return {
    ...state,
    [id]: {
      ...state[id],
      seasons: { ...state[id].seasons, ...newSeasons },
    },
  };
};

export const INITIAL_STATE = {};

export const reducer = createReducer(INITIAL_STATE, {
  [types.TVSHOW_ADD]: tvshowAdd,
  [types.TVSHOW_REMOVE]: tvshowRemove,
  [types.TVSHOW_UPDATE]: tvshowUpdate,
  [types.SEASONS_SUCCESS]: seasonsSuccess,
});

/* ========== SELECTORS ========== */

const selectors = {
  getTvshows: state => state.tvshows,
  getTvshow: (state, id) => state.tvshows[id],
};

/* ========== EXPORTS ========== */

export default { actions: Creators, selectors, types };
