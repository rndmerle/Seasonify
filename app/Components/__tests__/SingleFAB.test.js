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
  const { component, props } = setup();
  const Fab = component.find('Styled(Fab)');

  describe('when calling onPress', () => {
    Fab.simulate('press');

    it('calls onPress', () => {
      expect(props.onPress).toBeCalled();
    });
  });
});
