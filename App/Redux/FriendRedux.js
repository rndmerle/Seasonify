import Ident from '../Services/Ident';

const ADD = 'FRIEND/ADD';
const REMOVE = 'FRIEND/REMOVE';
const UPDATE = 'FRIEND/UPDATE';

/* ========== ACTIONS ========== */
export const friendActions = {
  addFriend: name => ({ type: ADD, payload: { name } }),
  removeFriend: id => ({ type: REMOVE, payload: { id } }),
  updateFriend: friend => ({ type: UPDATE, payload: friend }),
};

Ident.newid();
export const INITIAL_STATE = { [Ident.id()]: { id: Ident.id(), name: 'Myself' } };

/* ========== REDUCER ========== */
const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {

    case ADD:
      Ident.newid();
      return { ...state, [Ident.id()]: { id: Ident.id(), ...payload } };

    case REMOVE:
      const { [payload.id]: deleted, ...newState } = state;
      return newState;

    case UPDATE:
      return { ...state, [payload.id]: payload };

    default:
      return state;
  }
};
export default reducer;

/* ========== SELECTORS ========== */
export const friendSelectors = {
  getFriends: state => (state.friends),
};
