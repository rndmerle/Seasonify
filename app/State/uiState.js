/* @flow */
import { createReducer, createActions } from 'reduxsauce';

import type { Message, TvshowWithoutID } from 'Types';
import tvshowsNormalizer from 'Normalizers/tvshowsNormalizer';

export type State = {
  spinner: boolean,
  message: ?Message,
  suggestions: TvshowWithoutID[],
};
export type FullState = { ui: State };

export const INITIAL_STATE: State = {
  spinner: false,
  message: null,
  suggestions: [],
};

/* ========== ACTIONS ========== */

const { Types: types, Creators } = createActions({
  // a parameter named 'type' is forbidden
  startup: null,
  messageToast: ['level', 'text', 'button', 'callback'],
  messageReset: null,
  suggestionsRequest: ['text'],
  suggestionsSuccess: ['suggestions'],
  suggestionsFail: null,
  spinnerShow: null,
  spinnerHide: null,
});
export { Creators as uiActions };
export { types as uiTypes };

/* ========== REDUCERS ========== */

export const messageToast = (
  state: State,
  { level, text, button, callback }: Message,
): State => ({
  ...state,
  message: { level, text, button, callback },
});

export const messageReset = (state: State): State => ({ ...state, message: null });

export const suggestionsSuccess = (
  state: State,
  { suggestions }: { suggestions: Array<Object> },
): State => ({
  ...state,
  suggestions: tvshowsNormalizer(suggestions),
});

export const suggestionsFail = (state: State): State => ({ ...state, suggestions: [] });

export const spinnerShow = (state: State): State => ({ ...state, spinner: true });

export const spinnerHide = (state: State): State => ({ ...state, spinner: false });

export default createReducer(INITIAL_STATE, {
  [types.MESSAGE_TOAST]: messageToast,
  [types.MESSAGE_RESET]: messageReset,
  [types.SUGGESTIONS_SUCCESS]: suggestionsSuccess,
  [types.SUGGESTIONS_FAIL]: suggestionsFail,
  [types.SPINNER_SHOW]: spinnerShow,
  [types.SPINNER_HIDE]: spinnerHide,
});

/* ========== SELECTORS ========== */

const getMessage = (state: FullState): ?Message => state.ui.message;

const getSuggestions = (state: FullState): TvshowWithoutID[] => state.ui.suggestions;

const isSpinning = (state: FullState): boolean => state.ui.spinner;

export const uiSelectors = {
  getMessage,
  getSuggestions,
  isSpinning,
};
