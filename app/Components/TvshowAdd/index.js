/* @flow */
import { connect } from 'react-redux';
import React from 'react';

import { tvshowActions, tvshowSelectors } from 'State/tvshowState';
import { uiActions, uiSelectors } from 'State/uiState';
import HeaderModular from 'Components/HeaderModular';

import TvshowAdd from './TvshowAdd';

TvshowAdd.navigationOptions = ({ navigation }) => ({
  header: (
    <HeaderModular
      title="New TV Show"
      cancelButton={{ icon: 'arrow-back', action: navigation.goBack }}
    />
  ),
});

export default connect(
  state => ({
    suggestions: uiSelectors.getSuggestions(state),
    codes: tvshowSelectors.getCodes(state),
  }),
  {
    tvshowAddWithSeasons: tvshowActions.tvshowAddWithSeasons,
    suggestionsRequest: uiActions.suggestionsRequest,
  },
)(TvshowAdd);
