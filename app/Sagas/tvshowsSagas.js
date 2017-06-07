import { call, put, select } from 'redux-saga/effects';

import Ident from '../Libs/Ident';
import { uiActions } from '../Redux/uiRedux';
import { tvshowSelectors, tvshowActions } from '../Redux/tvshowRedux';

export function* searchTvshows(api, { payload }) {
  const response = yield call(api.searchTvshows, payload.text);
  if (response.error) {
    yield put(uiActions.suggestionsFail());
    yield put(uiActions.toastMessage('error', response.error));
  } else {
    yield put(uiActions.suggestionsSuccess(response.data));
  }
}

export function* addTvshowWithSeasons(api, { payload }) {
  Ident.newid();
  const tvshow = { ...payload, id: Ident.id() };
  yield put(tvshowActions.addTvshow(tvshow));
  yield put(uiActions.toastMessage('success', `${tvshow.name} added`));
  yield put(tvshowActions.seasonsRefresh(tvshow.id, true));
}

export function* updateSeasons(api, { payload }) {
  if (!payload.silent) yield put(uiActions.spinnerShow());
  const tvshow = yield select(tvshowSelectors.getTvshow, payload.id);
  const response = yield call(api.getSeasons, tvshow.allocine);
  if (response.error) {
    yield put(tvshowActions.seasonsFail());
    yield put(uiActions.toastMessage('error', response.error));
  } else {
    if (!payload.silent) {
      yield call(
        _informIfNewSeason,
        Object.keys(tvshow.seasons).length,
        Object.keys(response.data).length,
      );
    }
    yield put(tvshowActions.seasonsSuccess(tvshow.id, response.data));
  }
  if (!payload.silent) yield put(uiActions.spinnerHide());
}

function* _informIfNewSeason(countBefore, countAfter) {
  const nbNewSeasons = countAfter - countBefore;
  if (nbNewSeasons > 0) {
    yield put(
      uiActions.toastMessage(
        'success',
        `${nbNewSeasons} new season${nbNewSeasons > 1 ? 's' : ''}!`,
      ),
    );
  } else {
    yield put(uiActions.toastMessage('neutral', 'No new season :('));
  }
}
