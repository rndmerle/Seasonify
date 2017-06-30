import testReducer from 'Libs/testReducer';

import reducer, { uiActions, uiSelectors, INITIAL_STATE } from '../uiState';

describe('Reducer', () => {
  it('provides initial state', () => {
    testReducer(reducer, undefined, {}, INITIAL_STATE);
    expect(INITIAL_STATE).toMatchSnapshot();
  });

  it('handles messageToast action', () => {
    testReducer(
      reducer,
      undefined,
      [
        uiActions.messageToast('success', 'Message'),
        uiActions.messageToast('error', 'Other message'),
      ],
      {
        message: {
          level: 'error',
          text: 'Other message',
        },
      },
    );
  });

  it('handles messageReset action', () => {
    testReducer(reducer, undefined, [uiActions.messageReset()], {
      message: null,
    });
  });

  it('handles suggestionsSuccess action', () => {
    testReducer(
      reducer,
      undefined,
      [
        uiActions.suggestionsSuccess([
          { code: 1234, originalTitle: 'Tvshow 1', yearStart: 2014 },
          { code: 5678, originalTitle: 'Tvshow 2', yearStart: 2015 },
        ]),
      ],
      {
        suggestions: [
          {
            name: 'Tvshow 1',
            allocine: 1234,
            year: 2014,
            localizedName: undefined,
            poster: undefined,
            seasons: {},
            seasonsCount: 0,
          },
          {
            name: 'Tvshow 2',
            allocine: 5678,
            year: 2015,
            localizedName: undefined,
            poster: undefined,
            seasons: {},
            seasonsCount: 0,
          },
        ],
      },
    );
  });

  it('handles suggestionsFail action', () => {
    testReducer(reducer, undefined, [uiActions.suggestionsFail()], {
      suggestions: [],
    });
  });

  it('handles spinnerShow action', () => {
    testReducer(reducer, undefined, [uiActions.spinnerShow()], {
      spinner: true,
    });
  });

  it('handles spinnerHide action', () => {
    testReducer(reducer, undefined, [uiActions.spinnerHide()], {
      spinner: false,
    });
  });
});

/* ======= SELECTORS ======= */

describe('Selectors', () => {
  it('getMessage', () => {
    expect(
      uiSelectors.getMessage({
        ui: {
          message: { text: 'xxx' },
        },
      }),
    ).toEqual({ text: 'xxx' });
  });

  it('getSuggestions', () => {
    expect(
      uiSelectors.getSuggestions({
        ui: {
          suggestions: [{ code: 555 }],
        },
      }),
    ).toEqual([{ code: 555 }]);
  });

  it('isSpinning', () => {
    expect(
      uiSelectors.isSpinning({
        ui: {
          spinner: true,
        },
      }),
    ).toEqual(true);
  });
});
