import { testReducer } from '../../Libs/Testing';
import reducer, { uiActions as actions, INITIAL_STATE } from '../uiRedux';

describe('Reducer', () => {
  it('provides initial state', () => {
    testReducer(reducer, {}, INITIAL_STATE);
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('handles toastMessage action', () => {
    testReducer(
      reducer,
      [
        actions.toastMessage('success', 'Message'),
        actions.toastMessage('error', 'Other message'),
      ],
      {
        message: {
          type: 'error',
          text: 'Other message',
        },
      },
    );
  });
});
