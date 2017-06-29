/* @flow */
import { connect } from 'react-redux';
import React from 'react';

import TvshowDetailsHeader from 'Components/TvshowDetailsHeader';
import editState from 'State/editState';
import tvshowState from 'State/tvshowState';

import TvshowDetails from './TvshowDetails';

TvshowDetails.navigationOptions = ({ navigation }) => ({
  header: (
    <TvshowDetailsHeader
      tvshowId={navigation.state.params.tvshowId}
      navigate={navigation.navigate}
    />
  ),
});

export default connect(
  (state, ownProps) => ({
    tvshow: tvshowState.selectors.getTvshow(
      state,
      ownProps.navigation.state.params.tvshowId,
    ),
    isEditing: editState.selectors.isEditing(state),
    editedObject: editState.selectors.editedObject(state),
  }),
  {
    editUpdate: editState.actions.editUpdate,
    seasonsRefresh: tvshowState.actions.seasonsRefresh,
  },
)(TvshowDetails);
