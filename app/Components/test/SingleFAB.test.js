import React from 'react';
import SingleFAB from '../SingleFAB';

function setup(specificProps = {}) {
  const props = {
    icon: 'ok',
    onPress: jest.fn(),
    ...specificProps,
  };
  const component = shallow(<SingleFAB {...props} />);
  return {
    component,
    props,
    actions: {},
  };
}

describe('Rendering', () => {
  it('should match', () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });
});

describe('Events', () => {
  it('should call prop function, on press', () => {
    const { component, props } = setup();
    component.find('Styled(Fab)').simulate('press');
    expect(props.onPress).toBeCalled();
  });
});
