// import * as matchers from 'redux-saga-test-plan/matchers';
import { call, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { tvshowActions, tvshowSelectors } from 'State/tvshowState';
import { uiActions } from 'State/uiState';
import Identity from 'Libs/Identity';
import api from 'Libs/Allocine';
import rootSaga from 'Sagas/rootSaga';

describe('tvshowAddWithSeasons saga', () => {
  it('add the tv show', () => {
    const id = Identity.forceId('xxx123');
    const tvshow = { name: 'Tvshow', allocine: 555 };
    const tvshowWithId = { ...tvshow, id };
    const fakeSeasons = [{ seasonNumber: 1 }];
    const fakeSeasonsResult = {
      error: null,
      data: fakeSeasons,
    };
    return expectSaga(rootSaga)
      .put(tvshowActions.seasonsSuccess(id, fakeSeasons))
      .not.put(uiActions.spinnerShow())
      .put(tvshowActions.tvshowAdd(tvshowWithId))
      .provide([
        [call(api.getSeasons, 555), fakeSeasonsResult],
        [select(tvshowSelectors.getTvshow, id), tvshowWithId],
      ])
      .dispatch(tvshowActions.tvshowAddWithSeasons(tvshow))
      .silentRun();
  });
});
