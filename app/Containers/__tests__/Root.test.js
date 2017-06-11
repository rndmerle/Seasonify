import React from 'react';
import PersistConfig from 'Config/PersistConfig';
import { Root } from '../Root';

function setup(specificProps = {}) {
  const props = {
    startup: jest.fn(),
    ...specificProps,
  };
  const component = shallow(<Root {...props} />);
  return {
    component,
    props,
  };
}

describe('Rendering when default state', () => {
  const { component } = setup();
  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});

describe('componentDidMount & PersistConfig not active', () => {
  const { component, props } = setup();
  PersistConfig.active = false;
  component.instance().componentDidMount();

  it('should call startup match', () => {
    expect(props.startup).toBeCalled();
  });
});
