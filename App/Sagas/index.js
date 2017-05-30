import { takeLatest } from 'redux-saga/effects';
import Allocine from '../Services/Allocine';
import fixtures from '../Fixtures';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import { uiTypes } from '../Redux/UiRedux';

/* ------------- Sagas ------------- */

import { searchTvshows } from './TvshowsSagas';

/* ------------- API/Fixtures ------------- */

const api = DebugConfig.useFixtures ? fixtures : new Allocine();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield [takeLatest(uiTypes.SUGGESTIONS_REQUEST, searchTvshows, api)];
}
