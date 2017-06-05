import tvshowNormalizer from '../Normalizers/tvshowNormalizer';

export const types = {
  /* ========== TYPES ========== */
  MESSAGE_TOAST: 'UI/MESSAGE_TOAST',
  MESSAGE_HIDE: 'UI/MESSAGE_HIDE',
  SUGGESTIONS_REQUEST: 'UI/SUGGESTIONS_REQUEST',
  SUGGESTIONS_SUCCESS: 'UI/SUGGESTIONS_SUCCESS',
  SUGGESTIONS_FAIL: 'UI/SUGGESTIONS_FAIL',
  SPINNER_SHOW: 'UI/SPINNER_SHOW',
  SPINNER_HIDE: 'UI/SPINNER_HIDE',
};

/* ========== ACTIONS ========== */
export const uiActions = {
  toastMessage: (type, text) => ({
    type: types.MESSAGE_TOAST,
    payload: { type, text },
  }),
  hideMessage: () => ({
    type: types.MESSAGE_HIDE,
  }),
  suggestionsRequest: text => ({
    type: types.SUGGESTIONS_REQUEST,
    payload: { text },
  }),
  suggestionsSuccess: suggestions => ({
    type: types.SUGGESTIONS_SUCCESS,
    payload: { suggestions },
  }),
  suggestionsFail: () => ({
    type: types.SUGGESTIONS_FAIL,
  }),
  spinnerShow: () => ({
    type: types.SPINNER_SHOW,
  }),
  spinnerHide: () => ({
    type: types.SPINNER_HIDE,
  }),
};

export const INITIAL_STATE = {
  spinner: false,
  message: null,
  suggestions: [],
};

/* ========== REDUCER ========== */
const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.MESSAGE_TOAST:
      return { ...state, message: { type: payload.type, text: payload.text } };

    case types.MESSAGE_HIDE:
      return { ...state, message: null };

    case types.SUGGESTIONS_SUCCESS:
      const suggestions = tvshowNormalizer(payload.suggestions);
      return { ...state, suggestions };

    case types.SUGGESTIONS_FAIL:
      return { ...state, suggestions: [] };

    case types.SPINNER_SHOW:
      return { ...state, spinner: true };

    case types.SPINNER_HIDE:
      return { ...state, spinner: false };

    default:
      return state;
  }
};
export default reducer;

/* ========== SELECTORS ========== */
export const uiSelectors = {
  getMessage: state => state.ui.message,
  getSuggestions: state => state.ui.suggestions,
  isSpinning: state => state.ui.spinner,
};
