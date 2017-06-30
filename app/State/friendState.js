/* @flow */
import { createReducer, createActions } from 'reduxsauce';

import type { Friend, Friends } from 'Types';

export type State = Friends;
export type FullState = { friends: State };

export const INITIAL_STATE = {};

const { Types: types, Creators } = createActions({
  // a parameter named 'type' is forbidden
  friendAdd: ['id', 'name'],
  friendDelete: ['id'],
  friendDeleteProceed: ['id'],
  friendUndo: ['savedState'],
  friendUpdate: ['friend'],
});

/* ========== REDUCERS ========== */

export const friendAdd = (state: State, { id, name }: Friend): State => ({
  ...state,
  [id]: { id, name },
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

export const reducer = createReducer(INITIAL_STATE, {
  [types.FRIEND_ADD]: friendAdd,
  [types.FRIEND_DELETE_PROCEED]: friendDeleteProceed,
  [types.FRIEND_UNDO]: friendUndo,
  [types.FRIEND_UPDATE]: friendUpdate,
});

/* ========== SELECTORS ========== */
const selectors = {
  getFriends: (state: FullState): Friends => state.friends,
  getFriend: (state: FullState, id: string): Friend => state.friends[id],
};

/* ========== EXPORTS ========== */

export { Creators as friendActions };
export { selectors as friendSelectors };
export { types as friendTypes };
export default reducer;
