import { call, put, select } from 'redux-saga/effects';

import Ident from '../Libs/Ident';
import ui from '../Redux/uiRedux';
import tv from '../Redux/tvshowRedux';

export function* searchTvshows(api, { text }) {
  const response = yield call(api.searchTvshows, text);
  if (response.error) {
    yield put(ui.actions.suggestionsFail());
    yield put(ui.actions.messageToast('error', response.error));
  } else {
    yield put(ui.actions.suggestionsSuccess(response.data));
  }
}

export function* tvshowAddWithSeasons(api, { tvshow }) {
  Ident.newid();
  const newTvshow = { ...tvshow, id: Ident.id() };
  yield put(tv.actions.tvshowAdd(newTvshow));
  yield put(ui.actions.messageToast('success', `${newTvshow.name} added`));
  yield put(tv.actions.seasonsRefresh(newTvshow.id, true));
}

export function* updateSeasons(api, { id, silent }) {
  if (!silent) yield put(ui.actions.spinnerShow());
  const tvshow = yield select(tv.selectors.getTvshow, id);
  const response = yield call(api.getSeasons, tvshow.allocine);
  if (response.error) {
    yield put(tv.actions.seasonsFail());
    yield put(ui.actions.messageToast('error', response.error));
  } else {
    if (!silent) {
      yield call(
        _informIfNewSeason,
        Object.keys(tvshow.seasons).length,
        Object.keys(response.data).length,
      );
    }
    yield put(tv.actions.seasonsSuccess(tvshow.id, response.data));
  }
  if (!silent) yield put(ui.actions.spinnerHide());
}

function* _informIfNewSeason(countBefore, countAfter) {
  const nbNewSeasons = countAfter - countBefore;
  if (nbNewSeasons > 0) {
    yield put(
      ui.actions.messageToast(
        'success',
        `${nbNewSeasons} new season${nbNewSeasons > 1 ? 's' : ''}!`,
      ),
    );
  } else {
    yield put(ui.actions.messageToast('neutral', 'No new season :('));
  }
}
