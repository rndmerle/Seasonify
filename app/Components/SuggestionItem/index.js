/* @flow */
import { connect } from 'react-redux';

import { tvshowSelectors } from 'Store/tvshowStore';

import SuggestionItem from './SuggestionItem';

export default connect(
  state => ({
    codes: tvshowSelectors.getCodes(state),
  }),
  {},
)(SuggestionItem);
