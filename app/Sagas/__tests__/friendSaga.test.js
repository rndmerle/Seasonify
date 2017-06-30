// import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
import { select } from 'redux-saga/effects';

import { friendActions, friendSelectors } from 'State/friendState';
import { undoActions } from 'State/undoState';
import rootSaga from 'Sagas/rootSaga';

describe('friendDelete saga', () => {
  const friend = { id: 'abc123', name: 'Friend 1' };
  const currentState = {
    [friend.id]: friend,
    xyz789: { id: 'xyz789', name: 'Friend 2' },
  };
  const undoAction = friendActions.friendUndo(currentState);

  it('saves the state and delete the friend', () =>
    expectSaga(rootSaga)
      .put(friendActions.friendDeleteProceed(friend.id))
      .put(undoActions.undoAdd(undoAction))
      .put(undoActions.undoReset())
      .provide([
        [select(friendSelectors.getFriends), currentState],
        [select(friendSelectors.getFriend, friend.id), friend],
      ])
      .dispatch(friendActions.friendDelete(friend.id))
      .silentRun());
});
