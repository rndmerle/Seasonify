import testReducer from '../../Libs/testReducer';
import friend, { reducer, INITIAL_STATE } from '../friendRedux';

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
        friend.actions.friendAdd('xxx123', 'Someone'),
        friend.actions.friendAdd('xxx456', 'Someone else'),
      ],
      {
        xxx123: { id: 'xxx123', name: 'Someone' },
        xxx456: { id: 'xxx456', name: 'Someone else' },
      },
    );
  });

  it('handles friendRemove action', () => {
    testReducer(
      reducer,
      {
        xxx123: { id: 'xxx123', name: 'Someone' },
        xxx456: { id: 'xxx456', name: 'Someone else' },
      },
      [friend.actions.friendRemove('xxx123')],
      {
        xxx456: { id: 'xxx456', name: 'Someone else' },
      },
    );
  });
});

/* ======= SELECTORS ======= */

describe('Selectors', () => {
  it('getFriends', () => {
    expect(
      friend.selectors.getFriends({
        friends: {
          xxx123: { id: 'xxx123', name: 'Someone' },
        },
      }),
    ).toEqual({
      xxx123: { id: 'xxx123', name: 'Someone' },
    });
  });
});
