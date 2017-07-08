import { ListItem, View } from 'native-base';
import React from 'react';

import SuggestionItem from './SuggestionItem';

function setup(specificProps = {}) {
  const props = {
    navigation: NavigationMock,
    suggestionKey: 0,
    suggestionAllocine: 555,
    codes: {},
    poster: 'http://url//poster.jpg',
    title: 'Deadwood',
    subtitle: '2004',
    onPress: jest.fn(),
    ...specificProps,
  };
  const component = shallowDive(<SuggestionItem {...props} />, View);
  return {
    component,
    props,
  };
}

describe('Rendering', () => {
  it('should render', () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });

  it('should render, when no poster', () => {
    const { component } = setup({ poster: undefined });
    expect(component).toMatchSnapshot();
  });

  it('should render, when no subtitle', () => {
    const { component } = setup({ subtitle: undefined });
    expect(component).toMatchSnapshot();
  });

  it('should render, when already added', () => {
    const { component } = setup({ codes: { s1: 777, s2: 555 } });
    expect(component).toMatchSnapshot();
  });
});

describe('Events', () => {
  it('should call onPress, when pressing the list item (not already added)', () => {
    const { component, props } = setup();
    component.find(ListItem).simulate('press');
    expect(props.onPress).toBeCalled();
  });

  it("should'nt call onPress, when pressing the list item (already added)", () => {
    const { component, props } = setup({ codes: { s1: 777, s2: 555 } });
    component.find(ListItem).simulate('press');
    expect(props.onPress).not.toBeCalled();
  });
});
