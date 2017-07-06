/* @flow */
import { put, select } from 'redux-saga/effects';

import { friendActions, friendSelectors } from 'State/friendState';
import { uiActions } from 'State/uiState';
import { undoActions } from 'State/undoState';
import { viewingActions, viewingSelectors } from 'State/viewingState';

export function* friendSaveAndDelete({ id }: { id: string }): Generator<*, *, *> {
  const friend = yield select(friendSelectors.getFriend, id);
  const savedFriendState = yield select(friendSelectors.getFriends);
  const savedViewingState = yield select(viewingSelectors.getViewings);
  const undoFriendAction = friendActions.friendUndo(savedFriendState);
  const undoViewingAction = viewingActions.viewingUndo(savedViewingState);

  yield put(undoActions.undoReset());
  yield put(undoActions.undoAdd(undoFriendAction));
  yield put(undoActions.undoAdd(undoViewingAction));
  yield put(friendActions.friendDeleteProceed(id));
  yield put(viewingActions.viewingUnviewAll(id));
  yield put(
    uiActions.messageToast(
      'warning',
      `“${friend.name}” deleted`,
      'UNDO',
      undoActions.undo(),
    ),
  );
}
