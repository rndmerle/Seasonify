/* @flow */
import { createReducer, createActions } from 'reduxsauce';

import type { FullState } from 'Store';

type State = {
  isEditing: boolean,
  editedObject: Object,
};
export type EditState = State;

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
export { Creators as editActions };
export { types as editTypes };

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

export default createReducer(INITIAL_STATE, {
  [types.EDIT_START]: editStart,
  [types.EDIT_END]: editEnd,
  [types.EDIT_UPDATE]: editUpdate,
});

/* ========== SELECTORS ========== */

const isEditing = (state: FullState): boolean => state.edit.isEditing;

const editedObject = (state: FullState): Object => state.edit.editedObject;

export const editSelectors = {
  isEditing,
  editedObject,
};
