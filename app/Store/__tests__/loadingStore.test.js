import testReducer from 'Libs/testReducer';

import reducer, {
  loadingActions,
  loadingSelectors,
  loadingKeys,
  INITIAL_STATE,
} from '../loadingStore';

describe('Reducer', () => {
  it('provides initial state', () => {
    testReducer(reducer, undefined, {}, INITIAL_STATE);
    expect(INITIAL_STATE).toMatchSnapshot();
  });

  it('handles setLoading action', () => {
    testReducer(
      reducer,
      undefined,
      [loadingActions.setLoading(loadingKeys.TVSHOW, false)],
      {
        ...INITIAL_STATE,
        [loadingKeys.TVSHOW]: false,
      },
    );
  });

  it('handles toggleLoading action 1 time', () => {
    testReducer(
      reducer,
      { [loadingKeys.TVSHOW]: true },
      [loadingActions.toggleLoading(loadingKeys.TVSHOW)],
      { [loadingKeys.TVSHOW]: false },
    );
  });

  it('handles toggleLoading action 2 times', () => {
    testReducer(
      reducer,
      { [loadingKeys.TVSHOW]: true },
      [
        loadingActions.toggleLoading(loadingKeys.TVSHOW),
        loadingActions.toggleLoading(loadingKeys.TVSHOW),
      ],
      { [loadingKeys.TVSHOW]: true },
    );
  });

  it('handles falseAllLoading action', () => {
    testReducer(
      reducer,
      { [loadingKeys.TVSHOW]: true, [loadingKeys.FRIEND]: true },
      [loadingActions.falseAllLoading()],
      { [loadingKeys.TVSHOW]: false, [loadingKeys.FRIEND]: false },
    );
  });
});

/* ======= SELECTORS ======= */

describe('Selectors', () => {
  it('getLoading with initial state', () => {
    expect(
      loadingSelectors.getLoading(
        {
          loading: INITIAL_STATE,
        },
        loadingKeys.TVSHOW,
      ),
    ).toEqual(true);
  });
});
