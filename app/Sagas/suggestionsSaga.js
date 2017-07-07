/* @flow */
import { call, put } from 'redux-saga/effects';

import type { ApiResponse } from 'Types';
import { uiActions } from 'Store/uiStore';

export function* suggestionsRequest(
  api: Object,
  { text }: { text: string },
): Generator<*, *, *> {
  const response: ApiResponse = yield call(api.searchTvshows, text);
  if (response.data !== null) {
    yield put(uiActions.suggestionsSuccess(response.data));
  } else {
    yield put(uiActions.suggestionsFail());
    yield put(uiActions.messageToast('error', response.error));
  }
}
