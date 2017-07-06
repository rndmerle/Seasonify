// import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
import { select } from 'redux-saga/effects';

import { friendActions, friendSelectors } from 'State/friendState';
import { undoActions } from 'State/undoState';
import { viewingActions, viewingSelectors } from 'State/viewingState';
import rootSaga from 'Sagas/rootSaga';

describe('friendDelete saga', () => {
  const friend = { id: 'f1', name: 'Friend 1' };
  const currentFriendState = {
    [friend.id]: friend,
    f2: { id: 'f2', name: 'Friend 2' },
  };
  const currentViewingState = {
    abc123: { [friend.id]: 4, f2: 3 },
    xyz789: { [friend.id]: 2 },
  };
  const undoFriendAction = friendActions.friendUndo(currentFriendState);
  const undoViewingAction = viewingActions.viewingUndo(currentViewingState);

  it('saves the state and delete the friend', () =>
    expectSaga(rootSaga)
      .put(viewingActions.viewingUnviewAll(friend.id))
      .put(friendActions.friendDeleteProceed(friend.id))
      .put(undoActions.undoAdd(undoViewingAction))
      .put(undoActions.undoAdd(undoFriendAction))
      .put(undoActions.undoReset())
      .provide([
        [select(viewingSelectors.getViewings), currentViewingState],
        [select(friendSelectors.getFriends), currentFriendState],
        [select(friendSelectors.getFriend, friend.id), friend],
      ])
      .dispatch(friendActions.friendDelete(friend.id))
      .silentRun());
});
