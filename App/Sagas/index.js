import { takeLatest } from 'redux-saga/effects';
import Allocine, { ApiFixtures } from '../Services/Allocine';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import { types as uiTypes } from '../Redux/uiRedux';

/* ------------- Sagas ------------- */

import { searchTvshows } from './TvshowsSagas';

/* ------------- API/Fixtures ------------- */

const api = DebugConfig.useFixtures ? ApiFixtures : new Allocine();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield [takeLatest(uiTypes.SUGGESTIONS_REQUEST, searchTvshows, api)];
}
