/* @flow */
import { connect } from 'react-redux';

import { friendSelectors } from 'Store/friendStore';
import { viewingActions, viewingSelectors } from 'Store/viewingStore';

import SeasonList from './SeasonList';

export default connect(
  (state, { tvshowId }) => ({
    seasonViewings: viewingSelectors.getSeasonsWithViewers(state, { tvshowId }),
    friends: friendSelectors.getFriends(state),
  }),
  {
    viewingUpdate: viewingActions.viewingUpdate,
    viewingUnview: viewingActions.viewingUnview,
  },
)(SeasonList);
