const MESSAGE = 'UI/ADD';

/* ========== ACTIONS ========== */
export const showActions = {
  ToastMessage: (type, text) => ({ type: MESSAGE, payload: { type, text } }),
};

export const INITIAL_STATE = {
  message: '',
};

/* ========== REDUCER ========== */
const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case MESSAGE:
      return state;

    default:
      return state;
  }
};
export default reducer;

/* ========== SELECTORS ========== */
export const UiSelectors = {
  getMessage: state => state.message,
};
