import { put } from 'redux-saga/effects';
import ShowActions from '../Redux/ShowRedux';

export function* searchTvshows(action) {
  yield put(ShowActions.suggestFailure());
}
