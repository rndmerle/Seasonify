import deepFreeze from 'deep-freeze';
import reducer, { uiActions as actions, INITIAL_STATE } from '../uiRedux';

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

  it('handles MESSAGE_TOAST action', () => {
    testReducer(actions.toastMessage('success', 'Message'), {
      message: {
        type: 'success',
        text: 'Message',
      },
    });
  });
});