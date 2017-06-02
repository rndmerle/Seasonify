import { takeLatest } from 'redux-saga/effects';
import Allocine, { ApiFixtures } from 'app/Services/Allocine';
import DebugConfig from 'app/Config/DebugConfig';

/* ------------- Types ------------- */

import { types as uiTypes } from 'app/Redux/uiRedux';
import { types as tvshowTypes } from 'app/Redux/tvshowRedux';

/* ------------- Sagas ------------- */

import {
  searchTvshows,
  addTvshowWithSeasons,
  updateSeasons,
} from './tvshowsSagas';

/* ------------- API/Fixtures ------------- */

const api = DebugConfig.useFixtures ? ApiFixtures : new Allocine();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield [takeLatest(uiTypes.SUGGESTIONS_REQUEST, searchTvshows, api)];
  yield [takeLatest(tvshowTypes.ADD_WITH_SEASONS, addTvshowWithSeasons, api)];
  yield [takeLatest(tvshowTypes.SEASONS_REFRESH, updateSeasons, api)];
}
