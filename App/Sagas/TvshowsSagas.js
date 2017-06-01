import { call, put } from 'redux-saga/effects';
import { uiActions } from '../Redux/uiRedux';
import { showActions } from '../Redux/showRedux';

export function* searchTvshows(api, { payload }) {
  const response = yield call(api.searchShows, payload.text);
  if (response.error) {
    yield put(uiActions.suggestionsFail());
    yield put(uiActions.toastMessage('error', response.error));
  } else {
    yield put(uiActions.suggestionsSuccess(response.data));
  }
}

export function* updateSeasons(api, { payload }) {
  const response = yield call(api.getSeasons, payload.allocine);
  if (response.error) {
    yield put(showActions.seasonsFail());
    yield put(showActions.toastMessage('error', response.error));
  } else {
    yield put(showActions.seasonsSuccess(payload.id, response.data));
  }
}
