import Ident from '../Services/Ident';

/* ========== TYPES ========== */
export const types = {
  ADD: 'FRIEND/ADD',
  REMOVE: 'FRIEND/REMOVE',
  UPDATE: 'FRIEND/UPDATE',
};

/* ========== ACTIONS ========== */
export const friendActions = {
  addFriend: name => ({ type: types.ADD, payload: { name } }),
  removeFriend: id => ({ type: types.REMOVE, payload: { id } }),
  updateFriend: friend => ({ type: types.UPDATE, payload: friend }),
};

Ident.newid();
export const INITIAL_STATE = {
  [Ident.id()]: { id: Ident.id(), name: 'Myself' },
};

/* ========== REDUCER ========== */
const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.ADD:
      Ident.newid();
      return { ...state, [Ident.id()]: { id: Ident.id(), ...payload } };

    case types.REMOVE:
      const { [payload.id]: deleted, ...newState } = state;
      return newState;

    case types.UPDATE:
      return { ...state, [payload.id]: { ...state[payload.id], ...payload } };

    default:
      return state;
  }
};
export default reducer;

/* ========== SELECTORS ========== */
export const friendSelectors = {
  getFriends: state => state.friends,
};
