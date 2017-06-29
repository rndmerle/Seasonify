/* @flow */
import { connect } from 'react-redux';
import React from 'react';

import HeaderRoot from 'Components/HeaderRoot';
import tvshowState from 'State/tvshowState';

import TvshowList from './TvshowList';

TvshowList.navigationOptions = ({ navigation }) => ({
  header: <HeaderRoot title="TV Shows" navigation={navigation} />,
});

export default connect(
  state => ({
    tvshows: tvshowState.selectors.getTvshows(state),
  }),
  {},
)(TvshowList);
