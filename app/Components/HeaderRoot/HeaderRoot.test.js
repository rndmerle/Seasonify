import { Button, Header } from 'native-base';
import React from 'react';

import HeaderRoot from './HeaderRoot';

function setup(specificProps = {}) {
  const props = {
    title: 'Some tvshow',
    navigation: NavigationMock,
    ...specificProps,
  };
  const component = shallowDive(<HeaderRoot {...props} />, Header);
  return {
    component,
    props,
  };
}

describe('Rendering', () => {
  it('should render', () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });
});

describe('Events', () => {
  it('should call navigation.navigate', () => {
    const { component, props } = setup();
    component.find(Button).simulate('press');
    expect(props.navigation.navigate).toBeCalledWith('DrawerOpen');
  });
});
