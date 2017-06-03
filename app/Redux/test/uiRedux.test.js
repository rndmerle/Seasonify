import deepFreeze from 'deep-freeze';
import reducer, { uiActions, INITIAL_STATE } from '../uiRedux';

describe('reducer', () => {
  it('should provide initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should handle MESSAGE_TOAST action', () => {
    const before = { message: null };
    const action = uiActions.toastMessage('success', 'Message');
    const after = { message: { type: 'success', text: 'Message' } };
    deepFreeze(before);
    deepFreeze(action);
    expect(reducer(before, action)).toEqual(after);
  });
});
