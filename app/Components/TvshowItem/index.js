/* @flow */
import { connect } from 'react-redux';

import { tvshowSelectors } from 'Store/tvshowStore';
import { viewingSelectors } from 'Store/viewingStore';

import TvshowItem from './TvshowItem';

export default connect(
  () => (state, { tvshowId }) => ({
    seasonsCount: tvshowSelectors.makeGetSeasonsCount()(state, { tvshowId }),
    tvshow: tvshowSelectors.getTvshow(state, { tvshowId }),
    viewers: viewingSelectors.makeGetViewersArray()(state, { tvshowId }),
  }),
  {},
)(TvshowItem);
