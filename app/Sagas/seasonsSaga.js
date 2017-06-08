import { call, put, select } from 'redux-saga/effects';

import ui from '../Redux/uiRedux';
import tv from '../Redux/tvshowRedux';

export function* seasonsRefresh(api, { id, silent = false }) {
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
