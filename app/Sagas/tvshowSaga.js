/* @flow */
import { put, select } from 'redux-saga/effects';

import type { Tvshow } from 'Types';
import { tvshowActions, tvshowSelectors } from 'State/tvshowState';
import { uiActions } from 'State/uiState';
import { undoActions } from 'State/undoState';
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

export function* tvshowSaveAndDelete({ id }: { id: string }): Generator<*, *, *> {
  const tvshow = yield select(tvshowSelectors.getTvshow, id);
  const savedState = yield select(tvshowSelectors.getTvshows);
  const undoAction = tvshowActions.tvshowUndo(savedState);
  yield put(undoActions.undoReset());
  yield put(undoActions.undoAdd(undoAction));
  yield put(tvshowActions.tvshowDeleteProceed(id));
  yield put(
    uiActions.messageToast(
      'warning',
      `“${tvshow.name}” deleted`,
      'UNDO',
      undoActions.undo(),
    ),
  );
}
