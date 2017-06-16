import testReducer from 'Libs/testReducer';
import tv, { reducer, INITIAL_STATE } from '../tvshowState';

describe('Reducer', () => {
  it('provides initial state', () => {
    testReducer(reducer, undefined, {}, INITIAL_STATE);
    expect(INITIAL_STATE).toMatchSnapshot();
  });

  it('handles tvshowAdd action', () => {
    testReducer(
      reducer,
      undefined,
      [
        tv.actions.tvshowAdd({ id: 'abc-123', name: 'Deadwood', seasons: {} }),
        tv.actions.tvshowAdd({ id: 'xyz-789', name: 'Breaking Bad', seasons: {} }),
      ],
      {
        'abc-123': { id: 'abc-123', name: 'Deadwood', seasons: {} },
        'xyz-789': { id: 'xyz-789', name: 'Breaking Bad', seasons: {} },
      },
    );
  });

  it('handles tvshowRemove action', () => {
    testReducer(
      reducer,
      {
        xxx123: { id: 'xxx123', name: 'Tvshow 1' },
        xxx456: { id: 'xxx456', name: 'Tvshow 2' },
      },
      [tv.actions.tvshowRemove('xxx123')],
      {
        xxx456: { id: 'xxx456', name: 'Tvshow 2' },
      },
    );
  });

  it('handles tvshowUpdate action', () => {
    testReducer(
      reducer,
      {
        xxx123: { id: 'xxx123', name: 'Tvshow 1' },
        xxx456: { id: 'xxx456', name: 'Tvshow 2' },
      },
      [tv.actions.tvshowUpdate({ id: 'xxx456', name: 'Tvshow 3' })],
      {
        xxx123: { id: 'xxx123', name: 'Tvshow 1' },
        xxx456: { id: 'xxx456', name: 'Tvshow 3' },
      },
    );
  });

  it('handles seasonsSuccess action', () => {
    testReducer(
      reducer,
      {
        xxx123: { id: 'xxx123', name: 'Tvshow 1', seasons: {} },
      },
      [tv.actions.seasonsSuccess('xxx123', [{ seasonNumber: 1 }])],
      {
        xxx123: { id: 'xxx123', name: 'Tvshow 1', seasons: { 1: { id: 1 } } },
      },
    );
  });

  it('handles seasonRemove action', () => {
    testReducer(
      reducer,
      {
        xxx123: {
          name: 'Tvshow 1',
          seasons: {
            1: { id: 1 },
            2: { id: 2 },
          },
        },
      },
      [tv.actions.seasonRemove('Tvshow 1', 2)],
      {
        xxx123: { name: 'Tvshow 1', seasons: { 1: { id: 1 } } },
      },
    );
  });
});

/* ======= SELECTORS ======= */

describe('Selectors', () => {
  it('getTvshow', () => {
    expect(
      tv.selectors.getTvshow(
        {
          tvshows: {
            a: { name: 'A' },
            b: { name: 'B' },
          },
        },
        'b',
      ),
    ).toEqual({ name: 'B' });
  });

  it('getTvshows', () => {
    expect(
      tv.selectors.getTvshows({
        tvshows: {
          a: { name: 'A' },
          b: { name: 'B' },
        },
      }),
    ).toEqual({
      a: { name: 'A' },
      b: { name: 'B' },
    });
  });

  it('getCodes', () => {
    expect(
      tv.selectors.getCodes({
        tvshows: {
          a: { name: 'A', allocine: 123 },
          b: { name: 'B', allocine: 456 },
        },
      }),
    ).toEqual([123, 456]);
  });
});
