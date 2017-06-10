import { call, put } from 'redux-saga/effects';

import ui from 'State/uiState';

export function* suggestionsRequest(api, { text }) {
  const response = yield call(api.searchTvshows, text);
  if (response.error) {
    yield put(ui.actions.suggestionsFail());
    yield put(ui.actions.messageToast('error', response.error));
  } else {
    yield put(ui.actions.suggestionsSuccess(response.data));
  }
}
