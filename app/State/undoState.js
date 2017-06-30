/* @flow */
import { createReducer, createActions } from 'reduxsauce';

export type State = {
  undoActions: Object[],
};
export type FullState = { undo: State };

export const INITIAL_STATE: State = {
  undoActions: [],
};

const { Types: types, Creators } = createActions({
  // a parameter named 'type' is forbidden
  undo: null,
  undoReset: null,
});

/* ========== REDUCERS ========== */
export const undoReset = (): State => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [types.UNDO_RESET]: undoReset,
});

/* ========== SELECTORS ========== */

const selectors = {
  undoActions: (state: FullState): Object[] => state.undo.undoActions,
};

/* ========== EXPORTS ========== */

export { Creators as undoActions };
export { selectors as undoSelectors };
export { types as undoTypes };
export default reducer;
