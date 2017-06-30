import testReducer from 'Libs/testReducer';

import reducer, { tvshowActions, tvshowSelectors, INITIAL_STATE } from '../tvshowState';

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
        tvshowActions.tvshowAdd({ id: 'abc-123', name: 'Deadwood', seasons: {} }),
        tvshowActions.tvshowAdd({ id: 'xyz-789', name: 'Breaking Bad', seasons: {} }),
      ],
      {
        'abc-123': { id: 'abc-123', name: 'Deadwood', seasons: {} },
        'xyz-789': { id: 'xyz-789', name: 'Breaking Bad', seasons: {} },
      },
    );
  });

  it('handles tvshowDeleteProceed action', () => {
    testReducer(
      reducer,
      {
        xxx123: { id: 'xxx123', name: 'Tvshow 1' },
        xxx456: { id: 'xxx456', name: 'Tvshow 2' },
      },
      [tvshowActions.tvshowDeleteProceed('xxx123')],
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
      [tvshowActions.tvshowUpdate({ id: 'xxx456', name: 'Tvshow 3' })],
      {
        xxx123: { id: 'xxx123', name: 'Tvshow 1' },
        xxx456: { id: 'xxx456', name: 'Tvshow 3' },
      },
    );
  });

  it('handles tvshowUndo action', () => {
    testReducer(
      reducer,
      {
        xxx123: { id: 'xxx123', name: 'Tvshow 1 mod' },
      },
      [
        tvshowActions.tvshowUndo({
          xxx123: { id: 'xxx123', name: 'Tvshow 1' },
          xxx456: { id: 'xxx456', name: 'Tvshow 2' },
        }),
      ],
      {
        xxx123: { id: 'xxx123', name: 'Tvshow 1' },
        xxx456: { id: 'xxx456', name: 'Tvshow 2' },
      },
    );
  });

  it('handles seasonsSuccess action', () => {
    testReducer(
      reducer,
      {
        xxx123: { id: 'xxx123', name: 'Tvshow 1', seasons: {} },
      },
      [tvshowActions.seasonsSuccess('xxx123', [{ seasonNumber: 1 }])],
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
      [tvshowActions.seasonRemove('Tvshow 1', 2)],
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
      tvshowSelectors.getTvshow(
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
      tvshowSelectors.getTvshows({
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
      tvshowSelectors.getCodes({
        tvshows: {
          a: { name: 'A', allocine: 123 },
          b: { name: 'B', allocine: 456 },
        },
      }),
    ).toEqual([123, 456]);
  });
});
