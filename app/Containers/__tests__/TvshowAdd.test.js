import React from 'react';

import { TvshowAdd } from '../TvshowAdd';

function setup(specificProps = {}) {
  const props = {
    navigation: {
      navigate: jest.fn(),
      goBack: jest.fn(),
      state: { params: {} },
    },
    codes: [111, 222],
    suggestions: [
      {
        allocine: 111,
        name: 'A tvshow',
        year: 2011,
        poster: 'http://poster1.png',
      },
      {
        allocine: 555,
        name: 'A other tvshow',
        year: 2015,
        poster: 'http://poster5.png',
      },
    ],
    tvshowAddWithSeasons: jest.fn(),
    suggestionsRequest: jest.fn(),
    ...specificProps,
  };
  const component = shallow(<TvshowAdd {...props} />);
  return {
    component,
    props,
  };
}

describe('Rendering, with 2 suggestions, one being already added', () => {
  const { component } = setup();
  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});

describe('Rendering, with no suggestions', () => {
  const { component } = setup({ suggestions: [] });
  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});

/* ========= Events & Functions ========= */

describe('Events & Functions, with 2 suggestions', () => {
  const { component, props } = setup();
  const Input = component.find('Styled(Input)');
  const SuggestionItem = component.find('SuggestionItem').first();

  describe('when calling onChangeText', () => {
    jest.useFakeTimers(); // because function is debounced
    Input.prop('onChangeText')('New name');

    it('calls suggestionsRequest', () => {
      jest.runAllTimers(); // because function is debounced
      expect(props.suggestionsRequest).toBeCalledWith('New name');
    });
  });

  describe('when calling onPress', () => {
    SuggestionItem.prop('onPress')(0);

    it('calls tvshowAddWithSeasons', () => {
      expect(props.tvshowAddWithSeasons).toBeCalledWith(props.suggestions[0]);
    });
  });
});
