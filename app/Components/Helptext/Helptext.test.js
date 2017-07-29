import React from 'react';

import Helptext from './Helptext';

function setup(specificProps = {}) {
  const props = {
    navigation: NavigationMock,
    ...specificProps,
  };
  const parent = shallow(<Helptext {...props} />);
  const level = [];
  level[0] = parent;
  level[1] = parent.dive();
  level[2] = level[1].dive();
  const component = parent;
  // const component = level[2];
  return {
    component,
    parent,
    level,
    props,
    // button: component.find(Button).first(),
  };
}

describe('Rendering when default state', () => {
  const { component } = setup();
  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});

describe('Rendering without note style and with fullscreen on', () => {
  const { component } = setup({ note: false, fullscreen: true });
  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});
