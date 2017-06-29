import { Dimensions, Image } from 'react-native';
import React from 'react';

import Poster from './Poster';

function setup(specificProps = {}) {
  const props = {
    url: 'http://somewhere.net/poster.jpg',
    ...specificProps,
  };
  const component = shallowDive(<Poster {...props} />, Image);
  return {
    component,
    props,
  };
}

describe('Rendering on default screen', () => {
  it('should render as PORTRAIT', () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });
});

describe('Rendering on landscape screen', () => {
  let component;

  beforeEach(() => {
    Dimensions.get = jest.fn().mockReturnValue({
      fontscale: 2,
      scale: 2,
      width: 1260,
      heigh: 720,
    });
    Dimensions.addEventListener = jest.fn();
    const { component: c } = setup();
    component = c;
  });

  it('should render as LANDSCAPE', () => {
    expect(component.props().orientation).toEqual('LANDSCAPE');
    expect(component).toMatchSnapshot();
  });
});
