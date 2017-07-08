/* @flow */
import { createReducer, createActions } from 'reduxsauce';
import { createSelector } from 'reselect';

import type { FullState } from 'Store';
import { sortAlpha } from 'Libs/Helpers';
import { sortingKeys, sortingSelectors } from 'Store/sortingStore';
import seasonsNormalizer from 'Normalizers/seasonsNormalizer';

type State = Tvshows;
export type TvshowState = State;

export const INITIAL_STATE = {};

/* ========== ACTIONS ========== */

const { Types: types, Creators } = createActions({
  // a parameter named 'type' is forbidden
  tvshowAddWithSeasons: ['tvshow'],
  tvshowAdd: ['tvshow'],
  tvshowDelete: ['id'],
  tvshowDeleteProceed: ['id'],
  tvshowUndo: ['savedState'],
  tvshowUpdate: ['tvshow'],
  seasonsRefresh: ['id', 'silent'],
  seasonsSuccess: ['id', 'seasons'],
  seasonsFail: null,
  seasonRemove: ['name', 'season'],
});
export { Creators as tvshowActions };
export { types as tvshowTypes };

/* ========== REDUCERS ========== */

export const tvshowAdd = (state: State, { tvshow }: { tvshow: Tvshow }): State => ({
  ...state,
  [tvshow.id]: { ...tvshow },
});

export const tvshowDeleteProceed = (state: State, { id }: { id: string }): State => {
  const { [id]: deleted, ...newState } = state;
  return newState;
};

export const tvshowUndo = (state: State, { savedState }: { savedState: State }): State =>
  savedState;

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

export default createReducer(INITIAL_STATE, {
  [types.TVSHOW_ADD]: tvshowAdd,
  [types.TVSHOW_DELETE_PROCEED]: tvshowDeleteProceed,
  [types.TVSHOW_UNDO]: tvshowUndo,
  [types.TVSHOW_UPDATE]: tvshowUpdate,
  [types.SEASONS_SUCCESS]: seasonsSuccess,
  [types.SEASON_REMOVE]: seasonRemove,
});

/* ========== SELECTORS ========== */

const getTvshows = (state: FullState): Tvshows => state.tvshows;

const getTvshow = (state: FullState, { tvshowId }: { tvshowId: string }): Tvshow =>
  state.tvshows[tvshowId];

const getCodes = createSelector(getTvshows, (tvshows: Tvshows): {
  [id: string]: number,
} =>
  Object.keys(tvshows).reduce(
    (codes, id) => ({ ...codes, [id]: tvshows[id].allocine }),
    {},
  ),
);

/* istanbul ignore next */
const _getSorting = (state: FullState): SortingValue =>
  sortingSelectors.getSorting(state, sortingKeys.TVSHOW);

const getTvshowsArray = createSelector(
  getTvshows,
  _getSorting,
  (tvshows: Tvshows, sorting: SortingValue): Tvshow[] =>
    objectValues(tvshows).sort((left: Tvshow, right: Tvshow) =>
      sortAlpha(sorting, left.name, right.name),
    ),
);

const getTvshowsIds = createSelector(
  getTvshows,
  _getSorting,
  (tvshows: Tvshows, sorting: SortingValue): string[] =>
    Object.keys(tvshows).sort((leftId: string, rightId: string) =>
      sortAlpha(sorting, tvshows[leftId].name, tvshows[rightId].name),
    ),
);

const makeGetSeasonsCount = () =>
  createSelector(getTvshow, (tvshow: Tvshow) => Object.keys(tvshow.seasons).length);

export const tvshowSelectors = {
  getTvshows,
  getTvshowsIds,
  getTvshow,
  getTvshowsArray,
  getCodes,
  makeGetSeasonsCount,
};
