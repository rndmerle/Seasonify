/* @flow */
import { createReducer, createActions } from 'reduxsauce';

import tvshowsNormalizer from 'Normalizers/tvshowsNormalizer';
import type { Message, TvshowWithoutID } from 'Types';

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
  messageToast: ['level', 'text'],
  messageHide: null,
  suggestionsRequest: ['text'],
  suggestionsSuccess: ['suggestions'],
  suggestionsFail: null,
  spinnerShow: null,
  spinnerHide: null,
});

/* ========== REDUCERS ========== */

export const messageToast = (state: State, { level, text }: Message): State => ({
  ...state,
  message: { level, text },
});

export const messageHide = (state: State): State => ({ ...state, message: null });

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

export const reducer = createReducer(INITIAL_STATE, {
  [types.MESSAGE_TOAST]: messageToast,
  [types.MESSAGE_HIDE]: messageHide,
  [types.SUGGESTIONS_SUCCESS]: suggestionsSuccess,
  [types.SUGGESTIONS_FAIL]: suggestionsFail,
  [types.SPINNER_SHOW]: spinnerShow,
  [types.SPINNER_HIDE]: spinnerHide,
});

/* ========== SELECTORS ========== */

const selectors = {
  getMessage: (state: FullState): ?Message => state.ui.message,
  getSuggestions: (state: FullState): TvshowWithoutID[] => state.ui.suggestions,
  isSpinning: (state: FullState): boolean => state.ui.spinner,
};

/* ========== EXPORTS ========== */

export default { actions: Creators, selectors, types };