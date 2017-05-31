/* ========== TYPES ========== */
export const types = {
  EDIT_START: 'EDIT/START',
  EDIT_END: 'EDIT/END',
  EDIT_UPDATE: 'EDIT/UPDATE',
};

/* ========== ACTIONS ========== */
export const editActions = {
  startEdit: () => ({
    type: types.EDIT_START,
  }),
  endEdit: () => ({
    type: types.EDIT_END,
  }),
  updateEdit: object => ({ type: types.EDIT_UPDATE, payload: { object } }),
};

export const INITIAL_STATE = {
  isEditing: false,
  object: null,
};

/* ========== REDUCER ========== */
const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.EDIT_START:
      return { ...state, isEditing: true };

    case types.EDIT_END:
      return { ...state, isEditing: false };

    case types.EDIT_UPDATE:
      return { ...state, object: payload.object };

    default:
      return state;
  }
};
export default reducer;

/* ========== SELECTORS ========== */
export const editSelectors = {
  isEditing: state => state.isEditing,
  getObject: state => state.object,
};
