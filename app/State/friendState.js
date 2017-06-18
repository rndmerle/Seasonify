/* @flow */
import { createReducer, createActions } from 'reduxsauce';

import type { Friend, Friends } from 'Types';

export type State = Friends;
export type FullState = { friends: State };

export const INITIAL_STATE = {};

const { Types: types, Creators } = createActions({
  // a parameter named 'type' is forbidden
  friendAdd: ['id', 'name'],
  friendRemove: ['id'],
  friendUpdate: ['friend'],
});

/* ========== REDUCERS ========== */

export const friendAdd = (state: State, { id, name }: Friend): State => ({
  ...state,
  [id]: { id, name },
});

export const friendRemove = (state: State, { id }: { id: string }): State => {
  const { [id]: deleted, ...newState } = state;
  return newState;
};

export const friendUpdate = (state: State, { friend }: { friend: Friend }): State => ({
  ...state,
  [friend.id]: { ...state[friend.id], ...friend },
});

export const reducer = createReducer(INITIAL_STATE, {
  [types.FRIEND_ADD]: friendAdd,
  [types.FRIEND_REMOVE]: friendRemove,
  [types.FRIEND_UPDATE]: friendUpdate,
});

/* ========== SELECTORS ========== */
const selectors = {
  getFriends: (state: FullState): Friends => state.friends,
};

/* ========== EXPORTS ========== */

export default { actions: Creators, selectors, types };
