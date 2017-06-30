/* @flow */
import { connect } from 'react-redux';
import React from 'react';

import { tvshowSelectors } from 'State/tvshowState';
import HeaderRoot from 'Components/HeaderRoot';

import TvshowList from './TvshowList';

TvshowList.navigationOptions = ({ navigation }) => ({
  header: <HeaderRoot title="TV Shows" navigation={navigation} />,
});

export default connect(
  state => ({
    tvshows: tvshowSelectors.getTvshows(state),
  }),
  {},
)(TvshowList);
