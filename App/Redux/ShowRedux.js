import Ident from '../Services/Ident';

/* ========== TYPES ========== */
export const types = {
  ADD: 'SHOW/ADD',
  REMOVE: 'SHOW/REMOVE',
  UPDATE: 'SHOW/UPDATE',
};

/* ========== ACTIONS ========== */
export const showActions = {
  addShow: (allocine, name, year, posterURL, seasonCount) => ({
    type: types.ADD,
    payload: { allocine, name, year, posterURL, seasonCount },
  }),
  removeShow: id => ({ type: types.REMOVE, payload: { id } }),
  updateShow: friend => ({ type: types.UPDATE, payload: friend }),
};

Ident.newid();
export const INITIAL_STATE = {
  [Ident.id()]: {
    id: Ident.id(),
    allocine: 7330,
    name: 'The Walking Dead',
    year: '2010',
    posterURL: 'http://fr.web.img5.acsta.net/medias/nmedia/18/78/35/82/20303823.jpg',
    seasonCount: '8',
    seasons: {},
  },
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
      return { ...state, [payload.id]: payload };

    default:
      return state;
  }
};
export default reducer;

/* ========== SELECTORS ========== */
export const showSelectors = {
  getShows: state => state.shows,
};
