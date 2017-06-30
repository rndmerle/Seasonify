/* @flow */
import { all, put, select } from 'redux-saga/effects';

import { undoActions, undoSelectors } from 'State/undoState';

export function* runRecoverOps(): Generator<*, *, *> {
  const recoverOps = yield select(undoSelectors.getRecoverOps);
  if (recoverOps.length) {
    yield all(recoverOps.reverse().map(op => put(op)));
    yield put(undoActions.undoReset());
  }
}
