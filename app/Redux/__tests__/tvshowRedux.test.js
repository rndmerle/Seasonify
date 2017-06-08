import { testReducer } from '../../Libs/Testing';
import tv, { reducer, INITIAL_STATE } from '../tvshowRedux';

describe('Reducer', () => {
  it('provides initial state', () => {
    testReducer(reducer, {}, INITIAL_STATE);
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('handles tvshowAdd action', () => {
    testReducer(
      reducer,
      [
        tv.actions.tvshowAdd({ id: 'abc-123', name: 'Deadwood' }),
        tv.actions.tvshowAdd({ id: 'xyz-789', name: 'Breaking Bad' }),
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
      tv.selectors.getTvshow({ tvshows: { a: { name: 'A' }, b: { name: 'B' } } }, 'b'),
    ).toEqual({ name: 'B' });
  });
});
