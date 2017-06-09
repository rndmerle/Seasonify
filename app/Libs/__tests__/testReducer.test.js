import testReducer from '../testReducer';

const ACTION = 'ACTION';

function someAction(value) {
  return {
    type: ACTION,
    value,
  };
}

function reducerWithObject(state = { counter: 0, other: false }, action) {
  switch (action.type) {
    case ACTION:
      return { ...state, counter: action.value };
    default:
      return state;
  }
}

test('testReducer can handles a reducer with an object as state', () => {
  testReducer(
    reducerWithObject,
    {
      counter: 1,
    },
    [someAction(2)],
    {
      counter: 2,
    },
  );
});

function reducerWithArray(state = [1], action) {
  switch (action.type) {
    case ACTION:
      return [...state, action.value];
    default:
      return state;
  }
}

test('testReducer can handles a reducer with an array as state', () => {
  testReducer(reducerWithArray, [2], [someAction(3)], [2, 3]);
});

function reducerWithInt(state = 1, action) {
  switch (action.type) {
    case ACTION:
      return action.value;
    default:
      return state;
  }
}

test('testReducer can handles a reducer with an integer as state', () => {
  testReducer(reducerWithInt, 2, [someAction(3)], 3);
});
