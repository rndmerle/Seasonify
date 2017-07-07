import { Container, ListItem, Radio } from 'native-base';
import React from 'react';

import PickScreen from './PickScreen';

function setup(specificProps = {}) {
  const props = {
    navigation: {
      goBack: jest.fn(),
      setParams: jest.fn(),
      state: {
        params: {
          title: 'Select something',
          isMultiSelection: false,
          onSelect: jest.fn(),
          collection: [{ id: 'a', name: 'Item A' }, { id: 'b', name: 'Item B' }],
        },
      },
    },
    ...specificProps,
  };
  const component = shallowDive(<PickScreen {...props} />, Container);
  return {
    component,
    props,
    listItem: component.find(ListItem).first(),
    radio: component.find(Radio).first(),
  };
}

describe('Rendering when default state', () => {
  const { component } = setup();
  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});

describe('Rendering with an object collection', () => {
  const { component } = setup({
    navigation: {
      goBack: jest.fn(),
      setParams: jest.fn(),
      state: {
        params: {
          title: 'Select something',
          isMultiSelection: false,
          onSelect: jest.fn(),
          collection: { a: { id: 'a', name: 'Item A' }, b: { id: 'b', name: 'Item B' } },
        },
      },
    },
  });

  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});

/* ========= Events & Functions ========= */

describe('Events & Functions', () => {
  const { props, listItem, radio } = setup();

  describe('when calling onPress on listItem or radio', () => {
    listItem.props().onPress();
    radio.props().onPress();

    it('calls ', () => {
      expect(props.navigation.state.params.onSelect).toBeCalledWith('a');
      expect(props.navigation.goBack).toBeCalled();
    });
  });
});
