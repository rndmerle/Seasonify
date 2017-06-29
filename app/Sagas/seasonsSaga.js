/* @flow */
import { call, fork, put, select } from 'redux-saga/effects';

import type { Tvshow, ApiResponse } from 'Types';
import tv from 'State/tvshowState';
import ui from 'State/uiState';

export function* seasonsRefresh(
  api: Object,
  { id, silent = false }: { id: string, silent: boolean },
): Generator<*, *, *> {
  if (!silent) yield put(ui.actions.spinnerShow());
  const tvshow: Tvshow = yield select(tv.selectors.getTvshow, id);
  const response: ApiResponse = yield call(api.getSeasons, tvshow.allocine);

  if (response.data !== null) {
    if (!silent) {
      yield fork(
        _informIfNewSeason,
        Object.keys(tvshow.seasons).length,
        response.data.length,
      );
    }
    yield put(tv.actions.seasonsSuccess(tvshow.id, response.data));
  } else {
    yield put(tv.actions.seasonsFail());
    yield put(ui.actions.messageToast('error', response.error));
  }
  if (!silent) yield put(ui.actions.spinnerHide());
}

function* _informIfNewSeason(countBefore: number, countAfter: number) {
  const nbNewSeasons: number = countAfter - countBefore;
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
