/* ========== TYPES ========== */
export const types = {
  MESSAGE_TOAST: 'UI/MESSAGE_TOAST',
  MESSAGE_HIDE: 'UI/MESSAGE_HIDE',
  SUGGESTIONS_REQUEST: 'UI/SUGGESTIONS_REQUEST',
  SUGGESTIONS_SUCCESS: 'UI/SUGGESTIONS_SUCCESS',
  SUGGESTIONS_FAIL: 'UI/SUGGESTIONS_FAIL',
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
};

export const INITIAL_STATE = {
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
      return { ...state, suggestions: payload.suggestions };

    case types.SUGGESTIONS_FAIL:
      return { ...state, suggestions: [] };

    default:
      return state;
  }
};
export default reducer;

/* ========== SELECTORS ========== */
export const uiSelectors = {
  getMessage: state => state.ui.message,
  getSuggestions: state => state.ui.suggestions,
};
