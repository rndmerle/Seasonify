import testReducer from '../testReducer';

const ACTION = 'ACTION';

function someAction(value) {
  return {
    type: ACTION,
    value,
  };
}

function reducer(state = { counter: 0, other: false }, action) {
  switch (action.type) {
    case ACTION:
      return { ...state, counter: action.value };
    default:
      return state;
  }
}

test('testReducer can handles a simple fake reducer', () => {
  testReducer(
    reducer,
    {
      counter: 1,
    },
    [someAction(2)],
    {
      counter: 2,
    },
  );
});
