import testReducer from 'Libs/testReducer';

import reducer, { undoActions, undoSelectors, INITIAL_STATE } from '../undoState';

describe('Reducer', () => {
  it('provides initial state', () => {
    testReducer(reducer, undefined, {}, INITIAL_STATE);
    expect(INITIAL_STATE).toMatchSnapshot();
  });

  it('handles undoReset action', () => {
    testReducer(
      reducer,
      {
        recoverOps: [{ type: 'FOO_UNDO', savedState: {} }],
      },
      [undoActions.undoReset()],
      {
        recoverOps: [],
      },
    );
  });

  it('handles undoAdd action', () => {
    testReducer(
      reducer,
      {
        recoverOps: [{ type: 'FOO_UNDO', savedState: {} }],
      },
      [undoActions.undoAdd({ type: 'BAR_UNDO', savedState: [1, 2] })],
      {
        recoverOps: [
          { type: 'FOO_UNDO', savedState: {} },
          { type: 'BAR_UNDO', savedState: [1, 2] },
        ],
      },
    );
  });
});

/* ======= SELECTORS ======= */

describe('Selectors', () => {
  it('getRecoverOps', () => {
    expect(
      undoSelectors.getRecoverOps({
        undo: {
          recoverOps: [{ type: 'FOO_UNDO' }, {}],
        },
      }),
    ).toEqual([{ type: 'FOO_UNDO' }, {}]);
  });
});
