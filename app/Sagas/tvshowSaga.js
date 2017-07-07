/* @flow */
import { put, select } from 'redux-saga/effects';

import type { Tvshow } from 'Types';
import { tvshowActions, tvshowSelectors } from 'Store/tvshowStore';
import { uiActions } from 'Store/uiStore';
import { undoActions } from 'Store/undoStore';
import { viewingActions, viewingSelectors } from 'Store/viewingStore';
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
  const tvshow = yield select(tvshowSelectors.getTvshow, { tvshowId: id });
  const savedTvshowState = yield select(tvshowSelectors.getTvshows);
  const savedViewingState = yield select(viewingSelectors.getViewings);
  const undoTvshowAction = tvshowActions.tvshowUndo(savedTvshowState);
  const undoViewingAction = viewingActions.viewingUndo(savedViewingState);

  yield put(undoActions.undoReset());
  yield put(undoActions.undoAdd(undoTvshowAction));
  yield put(undoActions.undoAdd(undoViewingAction));
  yield put(tvshowActions.tvshowDeleteProceed(id));
  yield put(viewingActions.viewingDelete(id));
  yield put(
    uiActions.messageToast(
      'warning',
      `“${tvshow.name}” deleted`,
      'UNDO',
      undoActions.undo(),
    ),
  );
}
