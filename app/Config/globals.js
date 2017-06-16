export default () => {
  /* Work-around because Object.values returns an Array<mixed> and it doesn't play well with Flow (Object.keys and then array[key] is fine but less convenient).
    Lib def declared in flow-typed/objectValues.js
    Also declared in Jest setup.
    cf. https://github.com/facebook/flow/issues/2174 and  https://github.com/facebook/flow/issues/2221
  */
  global.objectValues = map => Object.values(map);
};
