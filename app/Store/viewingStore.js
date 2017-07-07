/* @flow */
import { createReducer, createActions } from 'reduxsauce';
import { createSelector } from 'reselect';

import type { Friends, ViewerInfo, Viewing, Viewings } from 'Types';
import type { FullState } from 'Store';

type State = Viewings;
export type ViewingState = State;

export const INITIAL_STATE: State = {};

const { Types: types, Creators } = createActions({
  // a parameter named 'type' is forbidden
  viewingUpdate: ['tvshowId', 'friendId', 'viewed'],
  viewingUnview: ['tvshowId', 'friendId'],
  viewingUnviewAll: ['friendId'],
  viewingDelete: ['tvshowId'],
  viewingUndo: ['savedState'],
});
export { Creators as viewingActions };
export { types as viewingTypes };

/* ========== REDUCERS ========== */
const viewingUpdate = (
  state: State,
  { tvshowId, friendId, viewed }: { tvshowId: string, friendId: string, viewed: number },
): State => ({
  ...state,
  [tvshowId]: { ...state[tvshowId], [friendId]: viewed },
});

const viewingUnview = (
  state: State,
  { tvshowId, friendId }: { tvshowId: string, friendId: string },
): State => {
  const { [tvshowId]: tvshowView, ...newState } = state;
  const { [friendId]: deleted, ...newTvshowView } = tvshowView;
  return { [tvshowId]: newTvshowView, ...newState };
};

const viewingUnviewAll = (state: State, { friendId }: { friendId: string }): State =>
  Object.keys(state).reduce(
    (newState, tvshowId) => viewingUnview(newState, { tvshowId, friendId }),
    state,
  );

const viewingDelete = (state: State, { tvshowId }: { tvshowId: string }): State => {
  const { [tvshowId]: deleted, ...newState } = state;
  return { ...newState };
};

const viewingUndo = (state: State, { savedState }: { savedState: State }): State =>
  savedState;

export default createReducer(INITIAL_STATE, {
  [types.VIEWING_UPDATE]: viewingUpdate,
  [types.VIEWING_UNVIEW]: viewingUnview,
  [types.VIEWING_UNVIEW_ALL]: viewingUnviewAll,
  [types.VIEWING_DELETE]: viewingDelete,
  [types.VIEWING_UNDO]: viewingUndo,
});

/* ========== SELECTORS ========== */

const getViewings = ({ viewings }: FullState): Viewings => viewings;

const getViewers = (
  { viewings }: FullState,
  { tvshowId }: { tvshowId: string },
): Viewing => viewings[tvshowId] || {};

// From an array of friendId or from an object of {[friendId]:season}, build an array of viewers with the name, and the seasonsViewed if provided
const _eagerViewers = (viewers: Viewing | string[], friends: Friends) => {
  let viewersKeys = [];

  if (Array.isArray(viewers)) viewersKeys = viewers;
  else viewersKeys = Object.keys(viewers);

  return viewersKeys
    .filter(friendId => !!friends[friendId])
    .map(friendId =>
      Object.assign(
        {},
        { friendId, name: friends[friendId].name, color: friends[friendId].color },
        !Array.isArray(viewers) ? { seasonsViewed: viewers[friendId] } : undefined,
      ),
    )
    .sort((left, right) => left.name.localeCompare(right.name));
};

const makeGetViewersArray = () =>
  createSelector(
    getViewers,
    state => state.friends,
    (viewers: Viewing, friends: Friends): ViewerInfo[] => _eagerViewers(viewers, friends),
  );

const getSeasonsWithViewers = createSelector(
  getViewers,
  state => state.friends,
  (viewers: Viewing, friends: Friends): { [season: string]: ViewerInfo[] } => {
    const seasonWithViewers = Object.keys(viewers).reduce((seasons, friendId) => {
      const season = viewers[friendId];
      seasons[season] = [...(seasons[season] || []), friendId];
      return seasons;
    }, {});
    return Object.keys(seasonWithViewers).reduce((seasons, id) => {
      seasons[id] = _eagerViewers(seasonWithViewers[id], friends);
      return seasons;
    }, {});
  },
);

export const viewingSelectors = {
  getViewings,
  getViewers,
  makeGetViewersArray,
  getSeasonsWithViewers,
};
