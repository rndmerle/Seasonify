import { all, takeLatest } from 'redux-saga/effects';
import apiAllocine from 'Libs/Allocine';
import apiFixtures from 'Libs/apiFixtures';
import DebugConfig from 'Config/DebugConfig';

/* ------------- Types ------------- */

import ui from 'State/uiState';
import tv from 'State/tvshowState';

/* ------------- Sagas ------------- */

import * as suggestionsSaga from './suggestionsSaga';
import * as tvshowSaga from './tvshowSaga';
import * as seasonsSaga from './seasonsSaga';

/* ------------- API/Fixtures ------------- */

const api = DebugConfig.useFixtures ? apiFixtures : apiAllocine;

/* ------------- Connect Types To Sagas ------------- */

export default function* rootSaga() {
  yield all([
    takeLatest(ui.types.SUGGESTIONS_REQUEST, suggestionsSaga.suggestionsRequest, api),
    takeLatest(tv.types.TVSHOW_ADD_WITH_SEASONS, tvshowSaga.tvshowAddWithSeasons, api),
    takeLatest(tv.types.SEASONS_REFRESH, seasonsSaga.seasonsRefresh, api),
  ]);
}
