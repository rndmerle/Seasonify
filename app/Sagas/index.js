import { takeLatest } from 'redux-saga/effects';
import * as Allocine from '../Services/Allocine';
import apiFixtures from '../Services/apiFixtures';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import { types as uiTypes } from '../Redux/uiRedux';
import { types as tvshowTypes } from '../Redux/tvshowRedux';

/* ------------- Sagas ------------- */

import { searchTvshows, tvshowAddWithSeasons, updateSeasons } from './tvshowsSagas';

/* ------------- API/Fixtures ------------- */

const api = DebugConfig.useFixtures ? apiFixtures : Allocine;

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield [
    takeLatest(uiTypes.SUGGESTIONS_REQUEST, searchTvshows, api),
    takeLatest(tvshowTypes.TVSHOW_ADD_WITH_SEASONS, tvshowAddWithSeasons, api),
    takeLatest(tvshowTypes.SEASONS_REFRESH, updateSeasons, api),
  ];
}
