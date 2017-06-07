import React from 'react';
import SuggestionItem from '../SuggestionItem';

function setup(specificProps = {}) {
  const props = {
    suggestionKey: 0,
    poster: 'http://url//poster.jpg',
    title: 'Deadwood',
    subtitle: '2004',
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
});

describe('Events', () => {
  it('should call onPress, when pressing the list item', () => {
    const { component, props } = setup();
    component.find('Styled(ListItem)').simulate('press');
    expect(props.onPress).toBeCalled();
  });
});
