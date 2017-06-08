import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  // a parameter named 'type' is forbidden
  editStart: null,
  editEnd: null,
  editUpdate: ['editedObject'],
});
export const types = Types;

/* ========== REDUCERS ========== */
export const editStart = state => ({ ...state, isEditing: true });

export const editEnd = state => ({ ...state, editedObject: {}, isEditing: false });

export const editUpdate = (state, { editedObject }) => ({
  ...state,
  editedObject: { ...state.editedObject, ...editedObject },
});

export const INITIAL_STATE = {
  isEditing: false,
  editedObject: {},
};

export const reducer = createReducer(INITIAL_STATE, {
  [types.EDIT_START]: editStart,
  [types.EDIT_END]: editEnd,
  [types.EDIT_UPDATE]: editUpdate,
});

/* ========== SELECTORS ========== */

const selectors = {
  isEditing: state => state.edit.isEditing,
  editedObject: state => state.edit.editedObject,
};

/* ========== EXPORTS ========== */

export default { actions: Creators, selectors };
