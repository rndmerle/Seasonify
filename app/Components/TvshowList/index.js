/* @flow */
import { Text } from 'native-base';
import { connect } from 'react-redux';
import React from 'react';

import { sortingActions, sortingKeys, sortingSelectors } from 'Store/sortingStore';
import { tvshowSelectors } from 'Store/tvshowStore';
import HeaderRoot from 'Components/HeaderRoot';
import withToggles from 'HOC/withToggles';

import TvshowList from './TvshowList';

const Header = withToggles([
  {
    stateKey: sortingKeys.TVSHOW,
    selector: sortingSelectors.getSorting,
    action: sortingActions.toggleSorting,
    buttonFacets: { ASC: <Text>A-Z</Text>, DESC: <Text>Z-A</Text> },
  },
])(HeaderRoot);

TvshowList.navigationOptions = ({ navigation }) => ({
  header: <Header title="TV Shows" navigation={navigation} />,
});

export default connect(
  state => ({
    tvshowsIds: tvshowSelectors.getTvshowsIds(state),
  }),
  {},
)(TvshowList);
