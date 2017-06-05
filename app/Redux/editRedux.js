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
  updateEdit: editedObject => ({
    type: types.EDIT_UPDATE,
    payload: { editedObject },
  }),
};

export const INITIAL_STATE = {
  isEditing: false,
  editedObject: {},
};

/* ========== REDUCER ========== */
const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.EDIT_START:
      return { ...state, isEditing: true };

    case types.EDIT_END:
      return { ...state, editedObject: {}, isEditing: false };

    case types.EDIT_UPDATE:
      return {
        ...state,
        editedObject: { ...state.editedObject, ...payload.editedObject },
      };

    default:
      return state;
  }
};
export default reducer;

/* ========== SELECTORS ========== */
export const editSelectors = {
  isEditing: state => state.edit.isEditing,
  editedObject: state => state.edit.editedObject,
};
