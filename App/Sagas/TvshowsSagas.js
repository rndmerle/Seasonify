import { call, put } from 'redux-saga/effects';
import { uiActions } from '../Redux/UiRedux';

export function* searchTvshows(api, { payload }) {
  const response = yield call(api.searchShows, payload.text);
  if (response.error) {
    yield put(uiActions.suggestionsFail());
    yield put(uiActions.toastMessage('error', response.error));
  } else {
    yield put(uiActions.suggestionsSuccess(response.data));
  }
}
