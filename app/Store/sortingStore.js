/* @flow */
import { createReducer, createActions } from 'reduxsauce';

import type { FullState } from 'Store';

export type SortingStateKey = 'friend' | 'tvshow';
type StateValue = SortingValue;
type State = {
  [key: SortingStateKey]: StateValue,
};
export type SortingState = State;

export const sortingKeys = {
  FRIEND: 'friend',
  TVSHOW: 'tvshow',
};

const nextValue: { [value: StateValue]: StateValue } = { ASC: 'DESC', DESC: 'ASC' };

export const INITIAL_STATE: State = {
  [sortingKeys.FRIEND]: 'ASC',
  [sortingKeys.TVSHOW]: 'ASC',
};

const { Types: types, Creators } = createActions({
  setSorting: ['key', 'value'],
  toggleSorting: ['key'],
});
export { Creators as sortingActions };
export { types as sortingTypes };

/* ========== REDUCERS ========== */

const setSorting = (
  state: State,
  { key, value }: { key: SortingStateKey, value: StateValue },
): State => ({ ...state, [key]: value });

const toggleSorting = (state: State, { key }: { key: SortingStateKey }): State => ({
  ...state,
  [key]: nextValue[state[key]],
});

export default createReducer(INITIAL_STATE, {
  [types.SET_SORTING]: setSorting,
  [types.TOGGLE_SORTING]: toggleSorting,
});

/* ========== SELECTORS ========== */

const getSorting = (state: FullState, key: SortingStateKey): StateValue =>
  state.sorting[key];

export const sortingSelectors = {
  getSorting,
};
