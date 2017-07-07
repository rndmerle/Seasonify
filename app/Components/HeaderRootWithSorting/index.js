/* @flow */
import { connect } from 'react-redux';

import { sortingActions, sortingSelectors } from 'Store/sortingStore';

import HeaderRootWithSorting from './HeaderRootWithSorting';

export default connect(
  (state, { sortingKey }) => ({
    sorting: sortingSelectors.getSorting(state, sortingKey),
  }),
  {
    toggleSorting: sortingActions.toggleSorting,
  },
)(HeaderRootWithSorting);
