import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import api from '../../Services/Allocine';
import rootSaga from '../../Sagas/rootSaga';
import ui from '../../Redux/uiRedux';

describe('seasonsRefresh saga', () => {
  it('handles errors', () => {
    const fakeResult = {
      error: 'Network error',
      data: null,
    };
    return expectSaga(rootSaga)
      .put(ui.actions.suggestionsFail())
      .provide([[matchers.call.fn(api.searchTvshows), fakeResult]])
      .dispatch(ui.actions.suggestionsRequest('Tvshow'))
      .silentRun();
  });

  it('fetches the tvshows', () => {
    const fakeResults = {
      error: null,
      data: [
        {
          code: 1234,
          originalTitle: 'Tvhshow 1',
          yearStart: 2008,
        },
        {
          code: 7890,
          originalTitle: 'Tvhshow 2',
          yearStart: 2009,
        },
      ],
    };

    return expectSaga(rootSaga)
      .put(ui.actions.suggestionsSuccess(fakeResults.data))
      .provide([[call(api.searchTvshows, 'Tvshow'), fakeResults]])
      .dispatch(ui.actions.suggestionsRequest('Tvshow'))
      .silentRun();
  });
});
