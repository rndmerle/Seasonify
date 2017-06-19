/* @flow */
import { createReducer, createActions } from 'reduxsauce';

import seasonsNormalizer from 'Normalizers/seasonsNormalizer';
import type { Tvshow, Tvshows, Seasons } from 'Types';

export type State = Tvshows;
export type FullState = { tvshows: State };

export const INITIAL_STATE = {};

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
  seasonRemove: ['name', 'season'],
});

/* ========== REDUCERS ========== */

export const tvshowAdd = (state: State, { tvshow }: { tvshow: Tvshow }): State => ({
  ...state,
  [tvshow.id]: { ...tvshow },
});

export const tvshowRemove = (state: State, { id }: { id: string }): State => {
  const { [id]: deleted, ...newState } = state;
  return newState;
};

export const tvshowUpdate = (state: State, { tvshow }: { tvshow: Tvshow }): State => ({
  ...state,
  [tvshow.id]: { ...state[tvshow.id], ...tvshow },
});

export const seasonsSuccess = (
  state: State,
  { id, seasons }: { id: string, seasons: Seasons },
): State => {
  const newSeasons = seasonsNormalizer(seasons);
  return {
    ...state,
    [id]: {
      ...state[id],
      seasons: { ...state[id].seasons, ...newSeasons },
    },
  };
};

export const seasonRemove = (
  state: State,
  { name, season }: { name: string, season: string },
): State => {
  const tvshows = Object.keys(state).filter(key => state[key].name === name);
  const id = tvshows[0];
  const { [`${season}`]: deleted, ...restSeasons } = state[id].seasons;
  return {
    ...state,
    [id]: {
      ...state[id],
      seasons: restSeasons,
    },
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [types.TVSHOW_ADD]: tvshowAdd,
  [types.TVSHOW_REMOVE]: tvshowRemove,
  [types.TVSHOW_UPDATE]: tvshowUpdate,
  [types.SEASONS_SUCCESS]: seasonsSuccess,
  [types.SEASON_REMOVE]: seasonRemove,
});

/* ========== SELECTORS ========== */

const selectors = {
  getTvshows: (state: FullState): Tvshows => state.tvshows,
  getTvshow: (state: FullState, id: string): Tvshow => state.tvshows[id],
  getCodes: (state: FullState): Array<number> =>
    Object.keys(state.tvshows).map(key => state.tvshows[key].allocine),
};

/* ========== EXPORTS ========== */

export default { actions: Creators, selectors, types };