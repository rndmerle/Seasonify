import { testReducer } from '../../Libs/Testing';
import reducer, {
  tvshowActions as actions,
  tvshowSelectors as selectors,
  INITIAL_STATE,
} from '../tvshowRedux';

describe('Reducer', () => {
  it('provides initial state', () => {
    testReducer(reducer, {}, INITIAL_STATE);
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('handles addTvshow action', () => {
    testReducer(
      reducer,
      [
        actions.addTvshow({ id: 'abc-123', name: 'Deadwood' }),
        actions.addTvshow({ id: 'xyz-789', name: 'Breaking Bad' }),
      ],
      {
        'abc-123': { id: 'abc-123', name: 'Deadwood', seasons: {} },
        'xyz-789': { id: 'xyz-789', name: 'Breaking Bad', seasons: {} },
      },
    );
  });
});

describe('Selectors', () => {
  it('getTvshows', () => {
    expect(
      selectors.getTvshow({ tvshows: { a: { name: 'A' }, b: { name: 'B' } } }, 'b'),
    ).toEqual({ name: 'B' });
  });
});
