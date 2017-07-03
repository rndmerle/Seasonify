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
      navigation={navigation}
    />
  ),
});

export default connect(
  (state, { navigation: { state: { params: { tvshowId } } } }) => ({
    tvshow: tvshowSelectors.getTvshow(state, { tvshowId }),
    isEditing: editSelectors.isEditing(state),
    editedObject: editSelectors.editedObject(state),
  }),
  {
    editUpdate: editActions.editUpdate,
    seasonsRefresh: tvshowActions.seasonsRefresh,
  },
)(TvshowDetails);
