/* @flow */
import { connect } from 'react-redux';
import React from 'react';

import { sortingKeys } from 'State/sortingState';
import { tvshowSelectors } from 'State/tvshowState';
import HeaderRootWithSorting from 'Components/HeaderRootWithSorting';

import TvshowList from './TvshowList';

TvshowList.navigationOptions = ({ navigation }) => ({
  header: (
    <HeaderRootWithSorting
      title="TV Shows"
      navigation={navigation}
      sortingKey={sortingKeys.TVSHOW}
    />
  ),
});

export default connect(
  state => ({
    tvshowsIds: tvshowSelectors.getTvshowsIds(state),
  }),
  {},
)(TvshowList);
