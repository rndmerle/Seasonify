import React from 'react';
import SuggestionItem from '../SuggestionItem';

function setup(specificProps = {}) {
  const props = {
    suggestionKey: 0,
    poster: 'http://url//poster.jpg',
    title: 'Deadwood',
    subtitle: '2004',
    alreadyAdded: false,
    onPress: jest.fn(),
    ...specificProps,
  };
  const component = shallow(<SuggestionItem {...props} />);
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

  it('should render, when already added', () => {
    const { component } = setup({ alreadyAdded: true });
    expect(component).toMatchSnapshot();
  });
});

describe('Events', () => {
  it('should call onPress, when pressing the list item (not already added)', () => {
    const { component, props } = setup({ alreadyAdded: false });
    component.find('Styled(ListItem)').simulate('press');
    expect(props.onPress).toBeCalled();
  });

  it("should'nt call onPress, when pressing the list item (already added)", () => {
    const { component, props } = setup({ alreadyAdded: true });
    component.find('Styled(ListItem)').simulate('press');
    expect(props.onPress).not.toBeCalled();
  });
});
