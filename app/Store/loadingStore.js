/* @flow */
import { createReducer, createActions } from 'reduxsauce';

import type { FullState } from 'Store';

import { uiTypes } from './uiStore';

export type LoadingStateKey = 'tvshow' | 'friend';
type StateValue = LoadingValue;
type State = {
  [key: LoadingStateKey]: StateValue,
};
export type LoadingState = State;

export const loadingKeys = {
  TVSHOW: 'tvshow',
  FRIEND: 'friend',
};

export const INITIAL_STATE: State = {
  [loadingKeys.TVSHOW]: true,
  [loadingKeys.FRIEND]: true,
};

const nextValue = (value: StateValue) => !value;

const { Types: types, Creators } = createActions({
  setLoading: ['key', 'value'],
  toggleLoading: ['key'],
  falseAllLoading: null,
});
export { Creators as loadingActions };
export { types as loadingTypes };

/* ========== REDUCERS ========== */

const setLoading = (
  state: State,
  { key, value }: { key: LoadingStateKey, value: StateValue },
): State => ({ ...state, [key]: value });

const toggleLoading = (state: State, { key }: { key: LoadingStateKey }): State => ({
  ...state,
  [key]: nextValue(state[key]),
});

const falseAllLoading = (): State =>
  objectValues(loadingKeys).reduce(
    (newState, key) => ({ ...newState, [key]: false }),
    {},
  );

export default createReducer(INITIAL_STATE, {
  [types.SET_LOADING]: setLoading,
  [types.TOGGLE_LOADING]: toggleLoading,
  [types.FALSE_ALL_LOADING]: falseAllLoading,
  // Shared
  [uiTypes.STARTUP]: falseAllLoading,
});

/* ========== SELECTORS ========== */

const getLoading = (state: FullState, key: LoadingStateKey): StateValue =>
  state.loading[key];

export const loadingSelectors = {
  getLoading,
};
