import { Button } from 'native-base';
import React from 'react';

import HeaderRoot from 'Components/HeaderRoot';

import HeaderRootWithSorting from './HeaderRootWithSorting';

function setup(specificProps = {}) {
  const props = {
    title: 'Title',
    navigation: NavigationMock,
    sortingKey: 'friend',
    sorting: 'DESC',
    toggleSorting: jest.fn(),
    ...specificProps,
  };
  const component = shallowDive(<HeaderRootWithSorting {...props} />, HeaderRoot);
  // console.warn(component.debug());
  return {
    component,
    props,
  };
}

describe('Rendering when default state', () => {
  const { component } = setup();
  it('should match', () => {
    expect(component.dive()).toMatchSnapshot();
  });
});

/* ========= Events & Functions ========= */

describe('Events & Functions', () => {
  const { component, props } = setup();

  describe('pressing on the sorting button', () => {
    component.props().toggleButton.props.onPress();

    it('calls toggleSorting', () => {
      expect(props.toggleSorting).toBeCalledWith(props.sortingKey);
    });
  });
});
