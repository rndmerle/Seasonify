import testReducer from 'Libs/testReducer';

import reducer, {
  sortingActions,
  sortingSelectors,
  sortingKeys,
  INITIAL_STATE,
} from '../sortingStore';

describe('Reducer', () => {
  it('provides initial state', () => {
    testReducer(reducer, undefined, {}, INITIAL_STATE);
    expect(INITIAL_STATE).toMatchSnapshot();
  });

  it('handles setSorting action', () => {
    testReducer(
      reducer,
      undefined,
      [sortingActions.setSorting(sortingKeys.FRIEND, 'DESC')],
      {
        ...INITIAL_STATE,
        [sortingKeys.FRIEND]: 'DESC',
      },
    );
  });

  it('handles toggleSorting action 1 time', () => {
    testReducer(
      reducer,
      { [sortingKeys.FRIEND]: 'ASC' },
      [sortingActions.toggleSorting(sortingKeys.FRIEND)],
      { [sortingKeys.FRIEND]: 'DESC' },
    );
  });

  it('handles toggleSorting action 2 times', () => {
    testReducer(
      reducer,
      { [sortingKeys.FRIEND]: 'ASC' },
      [
        sortingActions.toggleSorting(sortingKeys.FRIEND),
        sortingActions.toggleSorting(sortingKeys.FRIEND),
      ],
      { [sortingKeys.FRIEND]: 'ASC' },
    );
  });
});

/* ======= SELECTORS ======= */

describe('Selectors', () => {
  it('getSorting with initial state', () => {
    expect(
      sortingSelectors.getSorting(
        {
          sorting: INITIAL_STATE,
        },
        sortingKeys.FRIEND,
      ),
    ).toEqual('ASC');
  });
});
