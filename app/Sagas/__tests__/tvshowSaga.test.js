// import * as matchers from 'redux-saga-test-plan/matchers';
import { call, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { tvshowActions, tvshowSelectors } from 'State/tvshowState';
import { uiActions } from 'State/uiState';
import { undoActions } from 'State/undoState';
import { viewingActions, viewingSelectors } from 'State/viewingState';
import Identity from 'Libs/Identity';
import api from 'Libs/Allocine';
import rootSaga from 'Sagas/rootSaga';

describe('tvshowAddWithSeasons saga', () => {
  const tvshowId = Identity.forceId('xxx123');
  const tvshow = { name: 'Tvshow', allocine: 555 };
  const tvshowWithId = { ...tvshow, id: tvshowId };
  const fakeSeasons = [{ seasonNumber: 1 }];
  const fakeSeasonsResult = {
    error: null,
    data: fakeSeasons,
  };

  it('add the tv show', () =>
    expectSaga(rootSaga)
      .put(tvshowActions.seasonsSuccess(tvshowId, fakeSeasons))
      .not.put(uiActions.spinnerShow())
      .put(tvshowActions.tvshowAdd(tvshowWithId))
      .provide([
        [call(api.getSeasons, 555), fakeSeasonsResult],
        [select(tvshowSelectors.getTvshow, { tvshowId }), tvshowWithId],
      ])
      .dispatch(tvshowActions.tvshowAddWithSeasons(tvshow))
      .silentRun());
});

describe('tvshowDelete saga', () => {
  const tvshow = { id: 'abc123', name: 'Tvshow 1' };
  const currentTvshowState = {
    [tvshow.id]: tvshow,
    xyz789: { id: 'xyz789', name: 'Tvshow 2' },
  };
  const currentViewingState = {
    [tvshow.id]: { f1: 4, f2: 3 },
    xyz789: { f1: 2 },
  };
  const undoTvshowAction = tvshowActions.tvshowUndo(currentTvshowState);
  const undoViewingAction = viewingActions.viewingUndo(currentViewingState);

  it('saves the state and delete the tvshow', () =>
    expectSaga(rootSaga)
      .put(viewingActions.viewingDelete(tvshow.id))
      .put(tvshowActions.tvshowDeleteProceed(tvshow.id))
      .put(undoActions.undoAdd(undoViewingAction))
      .put(undoActions.undoAdd(undoTvshowAction))
      .put(undoActions.undoReset())
      .provide([
        [select(viewingSelectors.getViewings), currentViewingState],
        [select(tvshowSelectors.getTvshows), currentTvshowState],
        [select(tvshowSelectors.getTvshow, { tvshowId: tvshow.id }), tvshow],
      ])
      .dispatch(tvshowActions.tvshowDelete(tvshow.id))
      .silentRun());
});
