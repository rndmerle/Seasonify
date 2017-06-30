/* @flow */
import { createReducer, createActions } from 'reduxsauce';

export type State = {
  isEditing: boolean,
  editedObject: Object,
};
export type FullState = { edit: State };

export const INITIAL_STATE: State = {
  isEditing: false,
  editedObject: {},
};

const { Types: types, Creators } = createActions({
  // a parameter named 'type' is forbidden
  editStart: null,
  editEnd: null,
  editUpdate: ['editedObject'],
});

/* ========== REDUCERS ========== */
export const editStart = (state: State): State => ({ ...state, isEditing: true });

export const editEnd = (state: State): State => ({
  ...state,
  editedObject: {},
  isEditing: false,
});

export const editUpdate = (
  state: State,
  { editedObject }: { editedObject: Object },
): State => ({
  ...state,
  editedObject: { ...state.editedObject, ...editedObject },
});

export const reducer = createReducer(INITIAL_STATE, {
  [types.EDIT_START]: editStart,
  [types.EDIT_END]: editEnd,
  [types.EDIT_UPDATE]: editUpdate,
});

/* ========== SELECTORS ========== */

const selectors = {
  isEditing: (state: FullState): boolean => state.edit.isEditing,
  editedObject: (state: FullState): Object => state.edit.editedObject,
};

/* ========== EXPORTS ========== */

export { Creators as editActions };
export { selectors as editSelectors };
export { types as editTypes };
export default reducer;
