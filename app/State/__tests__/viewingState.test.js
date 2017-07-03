import testReducer from 'Libs/testReducer';

import reducer, {
  viewingActions,
  viewingSelectors,
  INITIAL_STATE,
} from '../viewingState';

describe('Reducer', () => {
  it('provides initial state', () => {
    testReducer(reducer, undefined, {}, INITIAL_STATE);
    expect(INITIAL_STATE).toMatchSnapshot();
  });

  it('handles viewingUpdate action', () => {
    testReducer(
      reducer,
      undefined,
      [
        viewingActions.viewingUpdate('tvshow1', 'friend3', 4),
        viewingActions.viewingUpdate('tvshow2', 'friend2', 5),
        viewingActions.viewingUpdate('tvshow1', 'friend1', 3),
      ],
      {
        tvshow1: {
          friend3: 4,
          friend1: 3,
        },
        tvshow2: {
          friend2: 5,
        },
      },
    );
  });

  it('handles viewingUnview action', () => {
    testReducer(
      reducer,
      {
        tvshow1: {
          friend1: 3,
        },
        tvshow2: {
          friend1: 4,
          friend2: 5,
        },
      },
      [viewingActions.viewingUnview('tvshow2', 'friend1')],
      {
        tvshow1: {
          friend1: 3,
        },
        tvshow2: {
          friend2: 5,
        },
      },
    );
  });

  it('handles viewingDelete action', () => {
    testReducer(
      reducer,
      {
        tvshow1: {
          friend1: 3,
        },
        tvshow2: {
          friend1: 4,
        },
      },
      [viewingActions.viewingDelete('tvshow1')],
      {
        tvshow2: {
          friend1: 4,
        },
      },
    );
  });
});

/* ======= SELECTORS ======= */

describe('Selectors', () => {
  it('getViewers with initial state', () => {
    expect(
      viewingSelectors.getViewers({ viewings: INITIAL_STATE }, { tvshowId: 'tvshow2' }),
    ).toEqual({});
  });

  it('getViewers', () => {
    expect(
      viewingSelectors.getViewers(
        {
          viewings: {
            tvshow1: {
              friend1: 3,
            },
            tvshow2: {
              friend2: 5,
              friend3: 4,
            },
          },
        },
        { tvshowId: 'tvshow2' },
      ),
    ).toEqual({
      friend2: 5,
      friend3: 4,
    });
  });

  it('makeGetViewersArray', () => {
    expect(
      viewingSelectors.makeGetViewersArray()(
        {
          viewings: {
            tvshow2: {
              friend2: 5,
            },
            tvshow1: {
              friend3: 4,
              friend1: 3,
              friend2: 5,
              friendx: 2, // deleted Friend
            },
          },
          friends: {
            friend1: { name: 'C Friend' },
            friend2: { name: 'A Friend' },
            friend3: { name: 'B Friend' },
          },
        },
        { tvshowId: 'tvshow1' },
      ),
    ).toEqual([
      { friendId: 'friend2', name: 'A Friend', seasonsViewed: 5 },
      { friendId: 'friend3', name: 'B Friend', seasonsViewed: 4 },
      { friendId: 'friend1', name: 'C Friend', seasonsViewed: 3 },
    ]);
  });

  it('getSeasonsWithViewers', () => {
    expect(
      viewingSelectors.getSeasonsWithViewers(
        {
          viewings: {
            tvshow1: {
              friend3: 4,
              friend1: 5,
              friend2: 5,
              // friendx: 2, // deleted Friend
            },
          },
          friends: {
            friend1: { name: 'C Friend' },
            friend2: { name: 'A Friend' },
            friend3: { name: 'B Friend' },
          },
        },
        { tvshowId: 'tvshow1' },
      ),
    ).toEqual({
      4: [{ friendId: 'friend3', name: 'B Friend' }],
      5: [
        { friendId: 'friend2', name: 'A Friend' },
        { friendId: 'friend1', name: 'C Friend' },
      ],
    });
  });
});
