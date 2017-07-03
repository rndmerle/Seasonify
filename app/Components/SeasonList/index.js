/* @flow */
import { connect } from 'react-redux';

import { viewingSelectors } from 'State/viewingState';

import SeasonList from './SeasonList';

export default connect(
  (state, { tvshowId }) => ({
    seasonViewings: viewingSelectors.getSeasonsWithViewers(state, { tvshowId }),
  }),
  {},
)(SeasonList);
