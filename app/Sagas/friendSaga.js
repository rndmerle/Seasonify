/* @flow */
import { put, select } from 'redux-saga/effects';

import { friendActions, friendSelectors } from 'State/friendState';
import { uiActions } from 'State/uiState';
import { undoActions } from 'State/undoState';

export function* friendSaveAndDelete({ id }: { id: string }): Generator<*, *, *> {
  const friend = yield select(friendSelectors.getFriend, id);
  const savedState = yield select(friendSelectors.getFriends);
  const undoAction = friendActions.friendUndo(savedState);
  yield put(undoActions.undoReset());
  yield put(undoActions.undoAdd(undoAction));
  yield put(friendActions.friendDeleteProceed(id));
  yield put(
    uiActions.messageToast(
      'warning',
      `“${friend.name}” deleted`,
      'UNDO',
      undoActions.undo(),
    ),
  );
}
