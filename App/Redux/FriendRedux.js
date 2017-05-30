import Ident from '../Services/Ident';

/* ========== TYPES ========== */
export const friendTypes = {
  ADD: 'FRIEND/ADD',
  REMOVE: 'FRIEND/REMOVE',
  UPDATE: 'FRIEND/UPDATE',
};

/* ========== ACTIONS ========== */
export const friendActions = {
  addFriend: name => ({ type: friendTypes.ADD, payload: { name } }),
  removeFriend: id => ({ type: friendTypes.REMOVE, payload: { id } }),
  updateFriend: friend => ({ type: friendTypes.UPDATE, payload: friend }),
};

Ident.newid();
export const INITIAL_STATE = {
  [Ident.id()]: { id: Ident.id(), name: 'Myself' },
};

/* ========== REDUCER ========== */
const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case friendTypes.ADD:
      Ident.newid();
      return { ...state, [Ident.id()]: { id: Ident.id(), ...payload } };

    case friendTypes.REMOVE:
      const { [payload.id]: deleted, ...newState } = state;
      return newState;

    case friendTypes.UPDATE:
      return { ...state, [payload.id]: payload };

    default:
      return state;
  }
};
export default reducer;

/* ========== SELECTORS ========== */
export const friendSelectors = {
  getFriends: state => state.friends,
};
