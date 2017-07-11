import { Container } from 'native-base';
import React from 'react';

import DebugConfig from 'Config/DebugConfig';
import PersistConfig from 'Config/PersistConfig';

import { Root } from '../Root';

function setup(specificProps = {}) {
  const props = {
    startup: jest.fn(),
    ...specificProps,
  };
  const component = shallowDive(<Root {...props} />, Container);
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

describe('PersistConfig and PerfMonitor disabled', () => {
  const { component, props } = setup();
  PersistConfig.active = false;
  DebugConfig.PerfMonitor = false;
  component.instance().componentDidMount();

  it('should call startup', () => {
    expect(props.startup).toBeCalled();
  });
});
