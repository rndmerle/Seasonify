import { call, put } from 'redux-saga/effects';

import Ident from '../Services/Ident';
import { uiActions } from '../Redux/uiRedux';
import { tvshowActions } from '../Redux/tvshowRedux';

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
  yield put(tvshowActions.seasonsRefresh(tvshow.id, tvshow.allocine));
}

export function* updateSeasons(api, { payload }) {
  yield put(uiActions.spinnerShow());
  const response = yield call(api.getSeasons, payload.allocine);

  if (response.error) {
    yield put(tvshowActions.seasonsFail());
    yield put(uiActions.toastMessage('error', response.error));
  } else {
    yield call(
      informIfNewSeason,
      payload.count,
      Object.keys(response.data).length,
    );
    yield put(tvshowActions.seasonsSuccess(payload.id, response.data));
  }
  yield put(uiActions.spinnerHide());
}

function* informIfNewSeason(countBefore, countAfter) {
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
