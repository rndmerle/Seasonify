const types = {
  STARTUP: 'STARTUP',
};

export default {
  actions: {
    startup: () => ({ type: types.STARTUP }),
  },
  types,
};
