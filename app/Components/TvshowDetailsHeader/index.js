/* @flow */
import { connect } from 'react-redux';

import { editActions, editSelectors } from 'State/editState';
import { tvshowActions, tvshowSelectors } from 'State/tvshowState';
import { uiActions } from 'State/uiState';

import TvshowDetailsHeader from './TvshowDetailsHeader';

export default connect(
  (state, ownProps) => ({
    isEditing: editSelectors.isEditing(state),
    editedObject: editSelectors.editedObject(state),
    tvshow: tvshowSelectors.getTvshow(state, ownProps.tvshowId),
  }),
  {
    tvshowDelete: tvshowActions.tvshowDelete,
    tvshowUpdate: tvshowActions.tvshowUpdate,
    messageToast: uiActions.messageToast,
    editStart: editActions.editStart,
    editEnd: editActions.editEnd,
  },
)(TvshowDetailsHeader);
