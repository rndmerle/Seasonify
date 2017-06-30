import { all, takeLatest } from 'redux-saga/effects';

import { tvshowTypes } from 'State/tvshowState';
import { uiTypes } from 'State/uiState';
import DebugConfig from 'Config/DebugConfig';
import apiAllocine from 'Libs/Allocine';
import apiFixtures from 'Libs/apiFixtures';

import * as seasonsSaga from './seasonsSaga';
import * as suggestionsSaga from './suggestionsSaga';
import * as tvshowSaga from './tvshowSaga';

/* ------------- API/Fixtures ------------- */
/* istanbul ignore next */
const api = DebugConfig.useFixtures ? apiFixtures : apiAllocine;

/* ------------- Connect Types To Sagas ------------- */
export default function* rootSaga() {
  yield all([
    takeLatest(uiTypes.SUGGESTIONS_REQUEST, suggestionsSaga.suggestionsRequest, api),
    takeLatest(tvshowTypes.TVSHOW_ADD_WITH_SEASONS, tvshowSaga.tvshowAddWithSeasons, api),
    takeLatest(tvshowTypes.SEASONS_REFRESH, seasonsSaga.seasonsRefresh, api),
  ]);
}
