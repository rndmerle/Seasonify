/* @flow */
import { put, select } from 'redux-saga/effects';

import { friendActions, friendSelectors } from 'Store/friendStore';
import { uiActions } from 'Store/uiStore';
import { undoActions } from 'Store/undoStore';
import { viewingActions, viewingSelectors } from 'Store/viewingStore';

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
