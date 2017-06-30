/* @flow */
import { connect } from 'react-redux';
import React from 'react';

import { editActions, editSelectors } from 'State/editState';
import { tvshowActions, tvshowSelectors } from 'State/tvshowState';
import TvshowDetailsHeader from 'Components/TvshowDetailsHeader';

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
    tvshow: tvshowSelectors.getTvshow(state, ownProps.navigation.state.params.tvshowId),
    isEditing: editSelectors.isEditing(state),
    editedObject: editSelectors.editedObject(state),
  }),
  {
    editUpdate: editActions.editUpdate,
    seasonsRefresh: tvshowActions.seasonsRefresh,
  },
)(TvshowDetails);
