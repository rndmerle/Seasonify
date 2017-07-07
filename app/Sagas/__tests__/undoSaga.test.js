import { expectSaga } from 'redux-saga-test-plan';
import { select } from 'redux-saga/effects';

import { undoActions, undoSelectors } from 'Store/undoStore';
import rootSaga from 'Sagas/rootSaga';

describe('runUndoActions saga', () => {
  describe('with no ops to recover', () => {
    const recoverOps = [];

    it('does nothing', () => expectSaga(rootSaga)
        .provide([[select(undoSelectors.getRecoverOps), recoverOps]])
        .not.put(undoActions.undoReset())
        .dispatch(undoActions.undo())
        .silentRun());
  });

  describe('with 2 recover ops', () => {
    const recoverOps = [
      { type: 'FOO_UNDO', savedState: {} },
      { type: 'BAR_UNDO', savedState: [1, 2] },
    ];

    it('run the ops to undo last actions', () =>
      expectSaga(rootSaga)
        .put(undoActions.undoReset())
        .put(recoverOps[0])
        .put(recoverOps[1])
        .provide([[select(undoSelectors.getRecoverOps), recoverOps]])
        .dispatch(undoActions.undo())
        .silentRun());
  });
});
