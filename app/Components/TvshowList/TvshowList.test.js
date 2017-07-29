import { Container } from 'native-base';
import React from 'react';

import SingleFAB from 'Components/SingleFAB';

import TvshowList from './TvshowList';

function setup(specificProps = {}) {
  const props = {
    tvshowsIds: [],
    navigation: NavigationMock,
    isLoading: false,
    ...specificProps,
  };
  const component = shallowDive(<TvshowList {...props} />, Container);
  return {
    component,
    props,
    actions: {},
  };
}

describe('rendering with no series', () => {
  const { component } = setup();

  it('should show the help text', () => {
    expect(component).toMatchSnapshot();
  });
});

describe('rendering with 2 series', () => {
  const { component } = setup({
    tvshowsIds: ['abc', 'qsd'],
  });

  it('should show the list', () => {
    expect(component).toMatchSnapshot();
  });
});

describe('rendering with isLoading', () => {
  const { component } = setup({
    isLoading: true,
  });

  it('should show spinner when loading', () => {
    expect(component).toMatchSnapshot();
  });
});

describe('when clicking on FAB', () => {
  it('should navigate', () => {
    const { component, props } = setup();
    component.find(SingleFAB).simulate('press');
    expect(props.navigation.navigate).toBeCalledWith('TvshowAddPage');
  });
});
