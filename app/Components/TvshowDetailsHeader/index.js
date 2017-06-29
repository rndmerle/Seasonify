/* @flow */
import { connect } from 'react-redux';

import editState from 'State/editState';
import tvshowState from 'State/tvshowState';
import uiState from 'State/uiState';

import TvshowDetailsHeader from './TvshowDetailsHeader';

export default connect(
  (state, ownProps) => ({
    isEditing: editState.selectors.isEditing(state),
    editedObject: editState.selectors.editedObject(state),
    tvshow: tvshowState.selectors.getTvshow(state, ownProps.tvshowId),
  }),
  {
    tvshowRemove: tvshowState.actions.tvshowRemove,
    tvshowUpdate: tvshowState.actions.tvshowUpdate,
    messageToast: uiState.actions.messageToast,
    editStart: editState.actions.editStart,
    editEnd: editState.actions.editEnd,
  },
)(TvshowDetailsHeader);
