/* @flow */
import { all, put, select } from 'redux-saga/effects';

import { undoActions, undoSelectors } from 'Store/undoStore';

export function* runRecoverOps(): Generator<*, *, *> {
  const recoverOps = yield select(undoSelectors.getRecoverOps);
  if (recoverOps.length) {
    yield all(recoverOps.reverse().map(op => put(op)));
    yield put(undoActions.undoReset());
  }
}
