import { Fab } from 'native-base';
import React from 'react';

import SingleFAB from './SingleFAB';

function setup(specificProps = {}) {
  const props = {
    icon: 'ok',
    onPress: jest.fn(),
    ...specificProps,
  };
  const component = shallowDive(<SingleFAB {...props} />, Fab);
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
  const fab = component.find(Fab);

  describe('when calling onPress', () => {
    fab.simulate('press');

    it('calls onPress', () => {
      expect(props.onPress).toBeCalled();
    });
  });
});
