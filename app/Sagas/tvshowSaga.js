import { put } from 'redux-saga/effects';

import type { Tvshow } from 'Types';
import Identity from 'Libs/Identity';
import tv from 'State/tvshowState';
import ui from 'State/uiState';

export function* tvshowAddWithSeasons(
  api: Object,
  { tvshow }: { tvshow: Object },
): Generator<*, *, *> {
  const newTvshow: Tvshow = { ...tvshow, id: Identity.newid() };
  yield put(tv.actions.tvshowAdd(newTvshow));
  yield put(ui.actions.messageToast('success', `${newTvshow.name} added`));
  yield put(tv.actions.seasonsRefresh(newTvshow.id, true));
}
