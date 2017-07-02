/* @flow */
import { connect } from 'react-redux';

import { tvshowSelectors } from 'State/tvshowState';

import TvshowItem from './TvshowItem';

export default connect(
  () => (state, { tvshowId }) => ({
    seasonsCount: tvshowSelectors.makeGetSeasonsCount()(state, { tvshowId }),
    tvshow: tvshowSelectors.getTvshow(state, { tvshowId }),
  }),
  {},
)(TvshowItem);
