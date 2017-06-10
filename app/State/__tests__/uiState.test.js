import testReducer from 'Libs/testReducer';
import ui, { reducer, INITIAL_STATE } from '../uiState';

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

  it('handles messageHide action', () => {
    testReducer(reducer, undefined, [ui.actions.messageHide()], {
      message: null,
    });
  });

  it('handles suggestionsSuccess action', () => {
    testReducer(
      reducer,
      undefined,
      [
        ui.actions.suggestionsSuccess([
          { code: 1234, originalTitle: 'Tvshow 1', yearStart: 2014 },
          { code: 5678, originalTitle: 'Tvshow 2', yearStart: 2015 },
        ]),
      ],
      {
        suggestions: [
          { name: 'Tvshow 1', allocine: 1234, year: 2014, localizedName: null, poster: null },
          { name: 'Tvshow 2', allocine: 5678, year: 2015, localizedName: null, poster: null },
        ],
      },
    );
  });

  it('handles suggestionsFail action', () => {
    testReducer(reducer, undefined, [ui.actions.suggestionsFail()], {
      suggestions: [],
    });
  });

  it('handles spinnerShow action', () => {
    testReducer(reducer, undefined, [ui.actions.spinnerShow()], {
      spinner: true,
    });
  });

  it('handles spinnerHide action', () => {
    testReducer(reducer, undefined, [ui.actions.spinnerHide()], {
      spinner: false,
    });
  });
});

/* ======= SELECTORS ======= */

describe('Selectors', () => {
  it('getMessage', () => {
    expect(
      ui.selectors.getMessage({
        ui: {
          message: { text: 'xxx' },
        },
      }),
    ).toEqual({ text: 'xxx' });
  });

  it('getSuggestions', () => {
    expect(
      ui.selectors.getSuggestions({
        ui: {
          suggestions: [{ code: 555 }],
        },
      }),
    ).toEqual([{ code: 555 }]);
  });

  it('isSpinning', () => {
    expect(
      ui.selectors.isSpinning({
        ui: {
          spinner: true,
        },
      }),
    ).toEqual(true);
  });
});
