/* @flow */
import { createReducer, createActions } from 'reduxsauce';

export type RecoverOp = { type: string, savedState: Object };

export type State = {
  recoverOps: Array<RecoverOp>,
};
export type FullState = { undo: State };

export const INITIAL_STATE: State = {
  recoverOps: [],
};

const { Types: types, Creators } = createActions({
  // a parameter named 'type' is forbidden
  undo: null,
  undoAdd: ['action'],
  undoReset: null,
});

/* ========== REDUCERS ========== */
export const undoReset = (): State => INITIAL_STATE;

export const undoAdd = (state: State, { action }: { action: Object }): State => ({
  recoverOps: [...state.recoverOps, action],
});

export const reducer = createReducer(INITIAL_STATE, {
  [types.UNDO_RESET]: undoReset,
  [types.UNDO_ADD]: undoAdd,
});

/* ========== SELECTORS ========== */

const selectors = {
  getRecoverOps: (state: FullState): Array<RecoverOp> => state.undo.recoverOps,
};

/* ========== EXPORTS ========== */

export { Creators as undoActions };
export { selectors as undoSelectors };
export { types as undoTypes };
export default reducer;
