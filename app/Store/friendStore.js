/* @flow */
import { createReducer, createActions } from 'reduxsauce';
import { createSelector } from 'reselect';

import type { FullState } from 'Store';
import { sortAlpha } from 'Libs/Helpers';
import { sortingKeys, sortingSelectors } from 'Store/sortingStore';

import { uiTypes } from './uiStore';

type State = Friends;
export type FriendState = State;

export const INITIAL_STATE = {};

const { Types: types, Creators } = createActions({
  // a parameter named 'type' is forbidden
  friendAdd: ['id', 'name', 'color'],
  friendDelete: ['id'],
  friendDeleteProceed: ['id'],
  friendUndo: ['savedState'],
  friendUpdate: ['friend'],
});
export { Creators as friendActions };
export { types as friendTypes };

/* ========== REDUCERS ========== */

export const friendAdd = (state: State, { id, name, color }: Friend): State => ({
  ...state,
  [id]: { id, name, color },
});

export const friendDeleteProceed = (state: State, { id }: { id: string }): State => {
  const { [id]: deleted, ...newState } = state;
  return newState;
};

export const friendUndo = (state: State, { savedState }: { savedState: State }): State =>
  savedState;

export const friendUpdate = (state: State, { friend }: { friend: Friend }): State => ({
  ...state,
  [friend.id]: { ...state[friend.id], ...friend },
});

export const friendPopulateIfEmpty = (state: State): State =>
  state === INITIAL_STATE ? require('Fixtures/defaultFriends.json') : state;

export default createReducer(INITIAL_STATE, {
  [types.FRIEND_ADD]: friendAdd,
  [types.FRIEND_DELETE_PROCEED]: friendDeleteProceed,
  [types.FRIEND_UNDO]: friendUndo,
  [types.FRIEND_UPDATE]: friendUpdate,
  // Shared
  [uiTypes.STARTUP]: friendPopulateIfEmpty,
});

/* ========== SELECTORS ========== */

/* istanbul ignore next */
const _getSorting = (state: FullState): SortingValue =>
  sortingSelectors.getSorting(state, sortingKeys.FRIEND);

const getFriends = (state: FullState): Friends => state.friends;

const getFriend = (state: FullState, id: string): Friend => state.friends[id];

const getFriendsArray = createSelector(
  getFriends,
  _getSorting,
  (friends: Friends, sorting: SortingValue): Friend[] =>
    objectValues(friends).sort((left: Friend, right: Friend) =>
      sortAlpha(sorting, left.name, right.name),
    ),
);

const getFriendsIds = createSelector(
  getFriends,
  _getSorting,
  (friends: Friends, sorting: SortingValue): string[] =>
    Object.keys(friends).sort((leftId: string, rightId: string) =>
      sortAlpha(sorting, friends[leftId].name, friends[rightId].name),
    ),
);

export const friendSelectors = {
  getFriends,
  getFriend,
  getFriendsArray,
  getFriendsIds,
};
