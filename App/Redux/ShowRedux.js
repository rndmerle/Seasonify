import Ident from '../Services/Ident';

const ADD = 'SHOW/ADD';
const REMOVE = 'SHOW/REMOVE';
const UPDATE = 'SHOW/UPDATE';

/* ========== ACTIONS ========== */
export const showActions = {
  addShow: name => ({ type: ADD, payload: { name } }),
  removeShow: id => ({ type: REMOVE, payload: { id } }),
  updateShow: friend => ({ type: UPDATE, payload: friend }),
};

Ident.newid();
export const INITIAL_STATE = {
  [Ident.id()]: {
    id: Ident.id(),
    name: 'The Walking Dead',
  },
};

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
export const showSelectors = {
  getShows: state => (state.shows),
};
