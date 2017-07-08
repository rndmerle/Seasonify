/* @flow */
import { call, fork, put, select } from 'redux-saga/effects';

import { tvshowActions, tvshowSelectors } from 'Store/tvshowStore';
import { uiActions } from 'Store/uiStore';
import seasonsNormalizer from 'Normalizers/seasonsNormalizer';

export function* seasonsRefresh(
  api: Object,
  { id, silent = false }: { id: string, silent: boolean },
): Generator<*, *, *> {
  if (!silent) yield put(uiActions.spinnerShow());
  const tvshow: Tvshow = yield select(tvshowSelectors.getTvshow, { tvshowId: id });
  const response: ApiResponse = yield call(api.getSeasons, tvshow.allocine);

  if (response.data !== null) {
    if (!silent) {
      yield fork(
        _informIfNewSeason,
        Object.keys(tvshow.seasons).length,
        Object.keys(seasonsNormalizer(response.data)).length,
      );
    }
    yield put(tvshowActions.seasonsSuccess(tvshow.id, response.data));
  } else {
    yield put(tvshowActions.seasonsFail());
    yield put(uiActions.messageToast('error', response.error));
  }
  if (!silent) yield put(uiActions.spinnerHide());
}

function* _informIfNewSeason(countBefore: number, countAfter: number) {
  const nbNewSeasons: number = countAfter - countBefore;
  if (nbNewSeasons > 0) {
    yield put(
      uiActions.messageToast(
        'success',
        `${nbNewSeasons} new season${nbNewSeasons > 1 ? 's' : ''}!`,
      ),
    );
  } else {
    yield put(uiActions.messageToast('neutral', 'No new season :('));
  }
}
