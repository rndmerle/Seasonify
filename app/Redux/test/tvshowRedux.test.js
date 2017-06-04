import deepFreeze from 'deep-freeze';
import reducer, {
  tvshowActions as actions,
  tvshowSelectors as selectors,
  INITIAL_STATE,
} from '../tvshowRedux';

deepFreeze(INITIAL_STATE);

const testReducer = (action, finalState) => {
  deepFreeze(finalState);
  expect(reducer(INITIAL_STATE, action)).toEqual({
    ...INITIAL_STATE,
    ...finalState,
  });
};

describe('reducer', () => {
  it('provides initial state', () => {
    testReducer({}, INITIAL_STATE);
  });
});

describe('selectors', () => {
  it('getTvshows', () => {
    expect(
      selectors.getTvshow(
        { tvshows: { a: { name: 'A' }, b: { name: 'B' } } },
        'b',
      ),
    ).toEqual({ name: 'B' });
  });
});
