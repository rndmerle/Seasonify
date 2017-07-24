/* @flow */
import { connect } from 'react-redux';
import React from 'react';

import { editActions, editSelectors } from 'Store/editStore';
import { tvshowActions, tvshowSelectors } from 'Store/tvshowStore';
import { uiSelectors } from 'Store/uiStore';
import TvshowDetailsHeader from './TvshowDetailsHeader';

import TvshowDetails from './TvshowDetails';

// $FlowFixMe
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
    isSpinning: uiSelectors.isSpinning(state),
  }),
  {
    editUpdate: editActions.editUpdate,
    seasonsRefresh: tvshowActions.seasonsRefresh,
  },
)(TvshowDetails);
