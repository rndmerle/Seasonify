import { call } from 'redux-saga/effects';

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import api from 'Libs/Allocine';
import rootSaga from 'Sagas/rootSaga';
import tv from 'State/tvshowState';
import ui from 'State/uiState';

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
      .put(ui.actions.spinnerHide())
      .put(tv.actions.seasonsSuccess(id, fakeSeasons))
      .put(ui.actions.spinnerShow())
      .withState(stateForSelect)
      .provide([[call(api.getSeasons, 555), fakeSeasonsResult]])
      .dispatch(tv.actions.seasonsRefresh(id))
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
      .put(ui.actions.spinnerHide())
      .put(tv.actions.seasonsSuccess(id, fakeSeasons))
      .put(ui.actions.spinnerShow())
      .withState(stateForSelect)
      .provide([[call(api.getSeasons, 555), fakeSeasonsResult]])
      .dispatch(tv.actions.seasonsRefresh(id, false))
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
      .put(ui.actions.messageToast('neutral', 'No new season :('))
      .withState(stateForSelect)
      .provide([[matchers.call.fn(api.getSeasons), fakeSeasonsResult]])
      .dispatch(tv.actions.seasonsRefresh(id, false))
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
