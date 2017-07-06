/* @flow */
import { connect } from 'react-redux';

import { friendSelectors } from 'State/friendState';
import { viewingActions, viewingSelectors } from 'State/viewingState';

import SeasonList from './SeasonList';

export default connect(
  (state, { tvshowId }) => ({
    seasonViewings: viewingSelectors.getSeasonsWithViewers(state, { tvshowId }),
    friends: friendSelectors.getFriends(state),
  }),
  {
    viewingUpdate: viewingActions.viewingUpdate,
  },
)(SeasonList);
