/* @flow */
import { connect } from 'react-redux';
import React from 'react';

import HeaderModular from 'Components/HeaderModular';
import tvshowState from 'State/tvshowState';
import uiState from 'State/uiState';

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
    suggestions: uiState.selectors.getSuggestions(state),
    codes: tvshowState.selectors.getCodes(state),
  }),
  {
    tvshowAddWithSeasons: tvshowState.actions.tvshowAddWithSeasons,
    suggestionsRequest: uiState.actions.suggestionsRequest,
  },
)(TvshowAdd);
