import deepFreeze from 'deep-freeze';

export default function testReducer(reducer, init, action, expectedState) {
  const initialState = reducer(undefined, {});
  deepFreeze(initialState);
  deepFreeze(expectedState);
  let stateType = 'non-object';
  if (Array.isArray(initialState)) stateType = 'array';
  else if (typeof initialState === 'object') stateType = 'object';

  // if single action, still put in an array
  const actions = Array.isArray(action) ? action : [action];

  let reduceStarter;
  if (stateType === 'array') reduceStarter = [...initialState, ...init];
  else if (stateType === 'object') reduceStarter = { ...initialState, ...init };

  // run all the actions/reducers and combine de states. We've to account for the fact that the initialState can be a literal, an object or an object
  const finalState = Object.keys(actions).reduce(
    (state, key) => reducer(state, actions[key]),
    reduceStarter,
  );

  if (stateType === 'array') expect(finalState).toEqual([...initialState, ...expectedState]);
  else if (stateType === 'object') {
    expect(finalState).toEqual({ ...initialState, ...expectedState });
  } else expect(finalState).toEqual(expectedState);
}
