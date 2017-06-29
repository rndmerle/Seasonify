import { Container, Input } from 'native-base';
import React from 'react';

import SuggestionItem from 'Components/SuggestionItem';

import TvshowAdd from './TvshowAdd';

function setup(specificProps = {}) {
  const props = {
    navigation: {
      navigate: jest.fn(),
      goBack: jest.fn(),
      state: { params: {} },
    },
    suggestions: [
      {
        allocine: 111,
        name: 'A tvshow',
        year: 2011,
        poster: 'http://poster1.png',
      },
      {
        allocine: 555,
        name: 'An other tvshow',
        year: 2015,
        poster: 'http://poster5.png',
      },
    ],
    codes: [111, 222],
    tvshowAddWithSeasons: jest.fn(),
    suggestionsRequest: jest.fn(),
    registerInput: jest.fn(),
    resetInput: jest.fn(),
    ...specificProps,
  };
  const component = shallowDive(<TvshowAdd {...props} />, Container);
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
  const input = component.find(Input);
  const suggestionItem = component.find(SuggestionItem).first();

  describe('when calling onChangeText', () => {
    jest.useFakeTimers(); // because function is debounced
    input.props().onChangeText('New name');

    it('calls suggestionsRequest', () => {
      jest.runAllTimers(); // because function is debounced
      expect(props.suggestionsRequest).toBeCalledWith('New name');
    });
  });

  describe('when calling onPress', () => {
    suggestionItem.props().onPress(0);

    it('calls tvshowAddWithSeasons', () => {
      expect(props.tvshowAddWithSeasons).toBeCalledWith(props.suggestions[0]);
    });
  });
});
