import React from 'react';
import Config from 'Config'; // eslint-disable-line no-unused-vars
import createStore from 'State'; // eslint-disable-line no-unused-vars
import { App } from '../App';

function setup(specificProps = {}) {
  const props = {
    ...specificProps,
  };
  const component = shallow(<App {...props} />);
  return {
    component,
    props,
  };
}

jest.mock('State', () =>
  jest.fn().mockReturnValue({
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: jest.fn(),
  }),
);

describe('Rendering when default state', () => {
  const { component } = setup();

  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});