/* @flow */
import { connect } from 'react-redux';

import { editActions, editSelectors } from 'Store/editStore';
import { tvshowActions, tvshowSelectors } from 'Store/tvshowStore';
import { uiActions } from 'Store/uiStore';

import TvshowDetailsHeader from './TvshowDetailsHeader';

export default connect(
  (state, { tvshowId }) => ({
    isEditing: editSelectors.isEditing(state),
    editedObject: editSelectors.editedObject(state),
    tvshow: tvshowSelectors.getTvshow(state, { tvshowId }),
  }),
  {
    tvshowDelete: tvshowActions.tvshowDelete,
    tvshowUpdate: tvshowActions.tvshowUpdate,
    messageToast: uiActions.messageToast,
    editStart: editActions.editStart,
    editEnd: editActions.editEnd,
  },
)(TvshowDetailsHeader);
