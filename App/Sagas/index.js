import { takeLatest } from 'redux-saga/effects';
import Allocine from '../Services/Allocine';
import Fixtures from '../Fixtures';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import { ShowTypes } from '../Redux/ShowRedux';

/* ------------- Sagas ------------- */

import { searchTvshows } from './TvshowsSagas';

/* ------------- API/Fixtures ------------- */

const api = DebugConfig.useFixtures ? Fixtures : new Allocine();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  // yield [takeLatest(ShowTypes.SUGGEST_REQUEST, searchTvshows)];
}
