import { testReducer } from '../../Libs/Testing';
import ui, { reducer, INITIAL_STATE } from '../uiRedux';

describe('Reducer', () => {
  it('provides initial state', () => {
    testReducer(reducer, {}, INITIAL_STATE);
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('handles messageToast action', () => {
    testReducer(
      reducer,
      [
        ui.actions.messageToast('success', 'Message'),
        ui.actions.messageToast('error', 'Other message'),
      ],
      {
        message: {
          level: 'error',
          text: 'Other message',
        },
      },
    );
  });
});
