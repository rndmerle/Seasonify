import { createReducer, createActions } from 'reduxsauce';

const { Types: types, Creators } = createActions({
  // a parameter named 'type' is forbidden
  friendAdd: ['id', 'name'],
  friendRemove: ['id'],
  friendUpdate: ['friend'],
});

/* ========== REDUCERS ========== */

export const friendAdd = (state, { id, name }) => ({
  ...state,
  [id]: { id, name },
});

export const friendRemove = (state, { id }) => {
  const { [id]: deleted, ...newState } = state;
  return newState;
};

export const friendUpdate = (state, { friend }) => ({
  ...state,
  [friend.id]: { ...state[friend.id], ...friend },
});

export const INITIAL_STATE = {};

export const reducer = createReducer(INITIAL_STATE, {
  [types.FRIEND_ADD]: friendAdd,
  [types.FRIEND_REMOVE]: friendRemove,
  [types.FRIEND_UPDATE]: friendUpdate,
});

/* ========== SELECTORS ========== */
const selectors = {
  getFriends: state => state.friends,
};

/* ========== EXPORTS ========== */

export default { actions: Creators, selectors, types };
