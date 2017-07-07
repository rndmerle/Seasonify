/* @flow */
import { createReducer, createActions } from 'reduxsauce';

import type { FullState } from 'Store';

export type RecoverOp = { type: string, savedState: Object };

type State = {
  recoverOps: Array<RecoverOp>,
};
export type UndoState = State;

export const INITIAL_STATE: State = {
  recoverOps: [],
};

const { Types: types, Creators } = createActions({
  // a parameter named 'type' is forbidden
  undo: null,
  undoAdd: ['action'],
  undoReset: null,
});
export { Creators as undoActions };
export { types as undoTypes };

/* ========== REDUCERS ========== */
export const undoReset = (): State => INITIAL_STATE;

export const undoAdd = (state: State, { action }: { action: Object }): State => ({
  recoverOps: [...state.recoverOps, action],
});

export default createReducer(INITIAL_STATE, {
  [types.UNDO_RESET]: undoReset,
  [types.UNDO_ADD]: undoAdd,
});

/* ========== SELECTORS ========== */

const getRecoverOps = (state: FullState): Array<RecoverOp> => state.undo.recoverOps;

export const undoSelectors = {
  getRecoverOps,
};
