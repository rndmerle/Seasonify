import { call, select } from 'redux-saga/effects';

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import Identity from '../../Libs/Identity';
import * as api from '../../Services/Allocine';
import rootSaga from '../../Sagas/rootSaga';
import tv from '../../Redux/tvshowRedux';
import ui from '../../Redux/uiRedux';

describe('seasonRefresh saga', () => {
  it("fetch the tvshow's seasons", () => {
    const id = Identity.forceId('xxx123');
    const tvshow = { id, name: 'Tvshow', allocine: 555, seasons: {} };
    const stateForSelect = { tvshows: { [id]: tvshow } };
    const fakeSeasons = [{ seasonNumber: 1 }];
    const fakeSeasonsResult = {
      error: null,
      data: fakeSeasons,
    };
    return expectSaga(rootSaga)
      .put(ui.actions.spinnerHide())
      .put(tv.actions.seasonsSuccess(tvshow.id, fakeSeasons))
      .put(ui.actions.spinnerShow())
      .withState(stateForSelect)
      .provide([[call(api.getSeasons, 555), fakeSeasonsResult]])
      .dispatch(tv.actions.seasonsRefresh(tvshow.id, false))
      .silentRun();
  });

  it('handles errors', () => {
    const fakeSeasonsResult = {
      error: 'Network error',
      data: null,
    };
    return expectSaga(rootSaga)
      .put(ui.actions.spinnerHide())
      .put(tv.actions.seasonsFail())
      .provide([
        [matchers.call.fn(api.getSeasons), fakeSeasonsResult],
        [matchers.select.selector(tv.selectors.getTvshow), {}],
      ])
      .dispatch(tv.actions.seasonsRefresh('abc', false))
      .silentRun();
  });
});
