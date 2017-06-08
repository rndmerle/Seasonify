import deepFreeze from 'deep-freeze';

/*
testReducer(
  reducer,
  [
    actions.messageToast('success', 'Message'),
    actions.messageToast('error', 'Other message'),
  ],
  {
    message: {
      type: 'error',
      text: 'Other message',
    },
  },
 */
export function testReducer(reducer, action, expectedState) {
  const initialState = reducer(undefined, {});
  deepFreeze(initialState);
  deepFreeze(expectedState);
  let stateType = 'non-object';
  if (Array.isArray(initialState)) stateType = 'array';
  else if (typeof state === 'object') stateType = 'object';

  // if single action, still put in an array
  const actions = Array.isArray(action) ? action : [action];

  // run all the actions/reducers and combine de states. We've to account for that fact that the initialState can be a literal, an object or an array
  const finalState = Object.keys(actions).reduce((state, key) => {
    const act = actions[key];
    switch (stateType) {
      case 'array':
        return [...state, ...reducer(state, act)];
      case 'object':
        return { ...state, ...reducer(state, act) };
      default:
        return reducer(state, act);
    }
  }, initialState);

  expect(finalState).toEqual({ ...initialState, ...expectedState });
}
