import { call, put } from 'redux-saga/effects';

import type { ApiResponse } from 'Types';
import ui from 'State/uiState';

export function* suggestionsRequest(
  api: Object,
  { text }: { text: string },
): Generator<*, *, *> {
  const response: ApiResponse = yield call(api.searchTvshows, text);
  if (response.data !== null) {
    yield put(ui.actions.suggestionsSuccess(response.data));
  } else {
    yield put(ui.actions.suggestionsFail());
    yield put(ui.actions.messageToast('error', response.error));
  }
}
