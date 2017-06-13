import { createReducer, createActions } from 'reduxsauce';

import type { Message } from 'Types';
import tvshowsNormalizer from 'Normalizers/tvshowsNormalizer';

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

export const messageToast = (state, { level, text }: Message) => ({
  ...state,
  message: { level, text },
});

export const messageHide = state => ({ ...state, message: null });

export const suggestionsSuccess = (state, { suggestions }) => ({
  ...state,
  suggestions: tvshowsNormalizer(suggestions),
});

export const suggestionsFail = state => ({ ...state, suggestions: [] });

export const spinnerShow = state => ({ ...state, spinner: true });

export const spinnerHide = state => ({ ...state, spinner: false });

export const INITIAL_STATE = {
  spinner: false,
  message: null,
  suggestions: [],
};

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
  getMessage: state => state.ui.message,
  getSuggestions: state => state.ui.suggestions,
  isSpinning: state => state.ui.spinner,
};

/* ========== EXPORTS ========== */

export default { actions: Creators, selectors, types };
