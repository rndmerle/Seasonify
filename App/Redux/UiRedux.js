/* ========== TYPES ========== */
export const uiTypes = {
  MESSAGE: 'UI/MESSAGE',
  SUGGESTIONS_REQUEST: 'UI/SUGGESTIONS_REQUEST',
  SUGGESTIONS_SUCCESS: 'UI/SUGGESTIONS_SUCCESS',
  SUGGESTIONS_FAIL: 'UI/SUGGESTIONS_FAIL',
};

/* ========== ACTIONS ========== */
export const uiActions = {
  toastMessage: (type, text) => ({
    type: uiTypes.MESSAGE,
    payload: { type, text },
  }),
  suggestionsRequest: text => ({
    type: uiTypes.SUGGESTIONS_REQUEST,
    payload: { text },
  }),
  suggestionsSuccess: suggestions => ({
    type: uiTypes.SUGGESTIONS_SUCCESS,
    payload: { suggestions },
  }),
  suggestionsFail: message => ({
    type: uiTypes.SUGGESTIONS_SUCCESS,
    payload: { message },
  }),
};

export const INITIAL_STATE = {
  message: { type: 'success', text: '' },
  suggestions: [],
};

/* ========== REDUCER ========== */
const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case uiTypes.MESSAGE:
      return { ...state, message: { type: payload.type, text: payload.text } };

    case uiTypes.SUGGESTIONS_SUCCESS:
      return { ...state, suggestions: payload.suggestions };

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
