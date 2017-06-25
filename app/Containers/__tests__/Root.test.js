import PerfMonitor from 'react-native/Libraries/Performance/RCTRenderingPerf';
import React from 'react';

import DebugConfig from 'Config/DebugConfig';
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

describe('componentDidMount & PersistConfig not active & DebugConfig.PerfMonitor active', () => {
  const { component, props } = setup();
  PersistConfig.active = false;
  DebugConfig.PerfMonitor = true;
  DebugConfig.PerfMonitorSettings = { waitBeforeStart: 0, recordingDuration: 0 };
  jest.useFakeTimers();
  PerfMonitor.toggle = jest.fn();
  PerfMonitor.start = jest.fn();
  PerfMonitor.stop = jest.fn();
  component.instance().componentDidMount();

  it('should call startup match', () => {
    expect(props.startup).toBeCalled();
    jest.runAllTimers();
  });
});
