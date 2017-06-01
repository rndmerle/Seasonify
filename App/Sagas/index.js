import { takeLatest } from 'redux-saga/effects';
import Allocine, { ApiFixtures } from '../Services/Allocine';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import { types as uiTypes } from '../Redux/uiRedux';
import { types as showTypes } from '../Redux/showRedux';

/* ------------- Sagas ------------- */

import { searchTvshows, updateSeasons } from './TvshowsSagas';

/* ------------- API/Fixtures ------------- */

const api = DebugConfig.useFixtures ? ApiFixtures : new Allocine();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield [takeLatest(uiTypes.SUGGESTIONS_REQUEST, searchTvshows, api)];
  yield [takeLatest(showTypes.SEASONS_REFRESH, updateSeasons, api)];
}
