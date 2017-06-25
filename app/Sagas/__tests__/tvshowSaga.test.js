// import * as matchers from 'redux-saga-test-plan/matchers';
import { call, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import Identity from 'Libs/Identity';
import api from 'Libs/Allocine';
import rootSaga from 'Sagas/rootSaga';
import tv from 'State/tvshowState';
import ui from 'State/uiState';

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
      .put(tv.actions.seasonsSuccess(id, fakeSeasons))
      .not.put(ui.actions.spinnerShow())
      .put(tv.actions.tvshowAdd(tvshowWithId))
      .provide([
        [call(api.getSeasons, 555), fakeSeasonsResult],
        [select(tv.selectors.getTvshow, id), tvshowWithId],
      ])
      .dispatch(tv.actions.tvshowAddWithSeasons(tvshow))
      .silentRun();
  });
});
