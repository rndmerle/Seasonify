import Ident from '../Services/Ident';

const ADD = 'SHOW/ADD';
const REMOVE = 'SHOW/REMOVE';
const UPDATE = 'SHOW/UPDATE';

/* ========== ACTIONS ========== */
export const showActions = {
  addShow: (allocine, name, year, posterURL, seasonCount) => ({
    type: ADD,
    payload: { allocine, name, year, posterURL, seasonCount },
  }),
  removeShow: id => ({ type: REMOVE, payload: { id } }),
  updateShow: friend => ({ type: UPDATE, payload: friend }),
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
  getShows: state => state.shows,
};
