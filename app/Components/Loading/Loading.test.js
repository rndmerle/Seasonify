import { Spinner } from 'native-base';
import React from 'react';

import Loading from './Loading';

function setup(specificProps = {}) {
  const props = {
    isSpinning: false,
    position: 'nextToFAB',
    color: 'lightblue',
    ...specificProps,
  };
  const component = shallow(<Loading {...props} />);
  return {
    component,
    props,
    actions: {},
  };
}

describe('rendering', () => {
  it('spinning if isSpinning', () => {
    const { component } = setup({
      isSpinning: true,
    });
    expect(component.find(Spinner)).toHaveLength(1);
  });

  it('not spinning if not isSpinning', () => {
    const { component } = setup({
      isSpinning: false,
    });
    expect(component.find(Spinner)).toHaveLength(0);
  });
});
