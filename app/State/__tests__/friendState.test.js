import testReducer from 'Libs/testReducer';

import reducer, { friendActions, friendSelectors, INITIAL_STATE } from '../friendState';

describe('Reducer', () => {
  it('provides initial state', () => {
    testReducer(reducer, undefined, {}, INITIAL_STATE);
    expect(INITIAL_STATE).toMatchSnapshot();
  });

  it('handles friendAdd action', () => {
    testReducer(
      reducer,
      undefined,
      [
        friendActions.friendAdd('xxx123', 'Someone', '#ffffff'),
        friendActions.friendAdd('xxx456', 'Someone else', '#ff00ff'),
      ],
      {
        xxx123: { id: 'xxx123', name: 'Someone', color: '#ffffff' },
        xxx456: { id: 'xxx456', name: 'Someone else', color: '#ff00ff' },
      },
    );
  });

  it('handles friendDeleteProceed action', () => {
    testReducer(
      reducer,
      {
        xxx123: { id: 'xxx123', name: 'Someone' },
        xxx456: { id: 'xxx456', name: 'Someone else' },
      },
      [friendActions.friendDeleteProceed('xxx123')],
      {
        xxx456: { id: 'xxx456', name: 'Someone else' },
      },
    );
  });
});

it('handles friendUndo action', () => {
  testReducer(
    reducer,
    {
      xxx123: { id: 'xxx123', name: 'Friend 1 mod' },
    },
    [
      friendActions.friendUndo({
        xxx123: { id: 'xxx123', name: 'Friend 1' },
        xxx456: { id: 'xxx456', name: 'Friend 2' },
      }),
    ],
    {
      xxx123: { id: 'xxx123', name: 'Friend 1' },
      xxx456: { id: 'xxx456', name: 'Friend 2' },
    },
  );
});

/* ======= SELECTORS ======= */

describe('Selectors', () => {
  it('getFriends', () => {
    expect(
      friendSelectors.getFriends({
        friends: {
          xxx123: { id: 'xxx123', name: 'Someone', color: '#ff00ff' },
        },
      }),
    ).toEqual({
      xxx123: { id: 'xxx123', name: 'Someone', color: '#ff00ff' },
    });
  });

  it('getFriend', () => {
    expect(
      friendSelectors.getFriend(
        {
          friends: {
            a: { name: 'A' },
            b: { name: 'B' },
          },
        },
        'b',
      ),
    ).toEqual({ name: 'B' });
  });
});
