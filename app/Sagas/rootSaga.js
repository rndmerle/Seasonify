import { all, takeLatest } from 'redux-saga/effects';

import { friendTypes } from 'Store/friendStore';
import { tvshowTypes } from 'Store/tvshowStore';
import { uiTypes } from 'Store/uiStore';
import { undoTypes } from 'Store/undoStore';
import DebugConfig from 'Config/DebugConfig';
import apiAllocine from 'Libs/Allocine';
import apiFixtures from 'Libs/apiFixtures';

import * as seasonsSaga from './seasonsSaga';
import * as suggestionsSaga from './suggestionsSaga';
import * as tvshowSaga from './tvshowSaga';
import * as friendSaga from './friendSaga';
import * as undoSaga from './undoSaga';

/* ------------- API/Fixtures ------------- */
/* istanbul ignore next */
const api = DebugConfig.useFixtures ? apiFixtures : apiAllocine;

/* ------------- Connect Types To Sagas ------------- */
export default function* rootSaga() {
  yield all([
    takeLatest(uiTypes.SUGGESTIONS_REQUEST, suggestionsSaga.suggestionsRequest, api),
    takeLatest(tvshowTypes.TVSHOW_ADD_WITH_SEASONS, tvshowSaga.tvshowAddWithSeasons, api),
    takeLatest(tvshowTypes.SEASONS_REFRESH, seasonsSaga.seasonsRefresh, api),

    takeLatest(undoTypes.UNDO, undoSaga.runRecoverOps),
    takeLatest(tvshowTypes.TVSHOW_DELETE, tvshowSaga.tvshowSaveAndDelete),
    takeLatest(friendTypes.FRIEND_DELETE, friendSaga.friendSaveAndDelete),
  ]);
}
