/* @flow */
import { put } from 'redux-saga/effects';

import type { Tvshow } from 'Types';
import { tvshowActions } from 'State/tvshowState';
import { uiActions } from 'State/uiState';
import Identity from 'Libs/Identity';

export function* tvshowAddWithSeasons(
  api: Object,
  { tvshow }: { tvshow: Object },
): Generator<*, *, *> {
  const newTvshow: Tvshow = { ...tvshow, id: Identity.newid() };
  yield put(tvshowActions.tvshowAdd(newTvshow));
  yield put(uiActions.messageToast('success', `“${newTvshow.name}” added`));
  yield put(tvshowActions.seasonsRefresh(newTvshow.id, true));
}
