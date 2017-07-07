import { Button, Header, Text } from 'native-base';
import React from 'react';

import HeaderRoot from './HeaderRoot';

function setup(specificProps = {}) {
  const props = {
    title: 'Some tvshow',
    navigation: NavigationMock,
    toggleButton: (
      <Button>
        <Text>toggle</Text>
      </Button>
    ),
    ...specificProps,
  };
  const component = shallowDive(<HeaderRoot {...props} />, Header);
  return {
    component,
    props,
  };
}

describe('Rendering', () => {
  it('should render, with toggle button', () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });

  it('should render, WITHOUT toggle button', () => {
    const { component } = setup({ toggleButton: undefined });
    expect(component).toMatchSnapshot();
  });
});

/* ========= Events & Functions ========= */

describe('Events & Functions', () => {
  const { component, props } = setup();
  const backButton = component.find(Button).first();

  describe('when calling onPress on the drawer button', () => {
    backButton.props().onPress();

    it('navigates', () => {
      expect(props.navigation.navigate).toBeCalledWith('DrawerOpen');
    });
  });
});
