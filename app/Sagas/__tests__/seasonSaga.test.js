import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { tvshowActions, tvshowSelectors } from 'State/tvshowState';
import { uiActions } from 'State/uiState';
import api from 'Libs/Allocine';
import rootSaga from 'Sagas/rootSaga';

describe('seasonRefresh saga', () => {
  it("fetch the tvshow's seasons, when there is 1 more", () => {
    const id = 'xxx123';
    const stateForSelect = {
      tvshows: { [id]: { id, name: 'Tvshow', allocine: 555, seasons: {} } },
    };
    const fakeSeasons = [{ seasonNumber: 1 }];
    const fakeSeasonsResult = {
      error: null,
      data: fakeSeasons,
    };
    return expectSaga(rootSaga)
      .put(uiActions.spinnerHide())
      .put(tvshowActions.seasonsSuccess(id, fakeSeasons))
      .put(uiActions.spinnerShow())
      .withState(stateForSelect)
      .provide([[call(api.getSeasons, 555), fakeSeasonsResult]])
      .dispatch(tvshowActions.seasonsRefresh(id))
      .silentRun();
  });

  it("fetch the tvshow's seasons, when there are 2 more", () => {
    const id = 'xxx123';
    const stateForSelect = {
      tvshows: { [id]: { id, name: 'Tvshow', allocine: 555, seasons: {} } },
    };
    const fakeSeasons = [{ seasonNumber: 1 }, { seasonNumber: 2 }];
    const fakeSeasonsResult = {
      error: null,
      data: fakeSeasons,
    };
    return expectSaga(rootSaga)
      .put(uiActions.spinnerHide())
      .put(tvshowActions.seasonsSuccess(id, fakeSeasons))
      .put(uiActions.spinnerShow())
      .withState(stateForSelect)
      .provide([[call(api.getSeasons, 555), fakeSeasonsResult]])
      .dispatch(tvshowActions.seasonsRefresh(id, false))
      .silentRun();
  });

  it("fetch the tvshow's seasons, when there is no more", () => {
    const id = 'xxx123';
    const stateForSelect = {
      tvshows: {
        [id]: {
          id,
          name: 'Tvshow',
          allocine: 555,
          seasons: {
            1: { id: 1 },
          },
        },
      },
    };
    const fakeSeasons = [{ seasonNumber: 1 }];
    const fakeSeasonsResult = {
      error: null,
      data: fakeSeasons,
    };
    return expectSaga(rootSaga)
      .put(uiActions.messageToast('neutral', 'No new season :('))
      .withState(stateForSelect)
      .provide([[matchers.call.fn(api.getSeasons), fakeSeasonsResult]])
      .dispatch(tvshowActions.seasonsRefresh(id, false))
      .silentRun();
  });

  it('handles errors', () => {
    const fakeSeasonsResult = {
      error: 'Network error',
      data: null,
    };
    return expectSaga(rootSaga)
      .put(uiActions.spinnerHide())
      .put(tvshowActions.seasonsFail())
      .provide([
        [matchers.call.fn(api.getSeasons), fakeSeasonsResult],
        [matchers.select.selector(tvshowSelectors.getTvshow), {}],
      ])
      .dispatch(tvshowActions.seasonsRefresh('abc', false))
      .silentRun();
  });
});
