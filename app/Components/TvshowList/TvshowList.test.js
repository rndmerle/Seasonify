import { Container } from 'native-base';
import React from 'react';

import Loading from 'Components/Loading';
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

describe('rendering', () => {
  it('should show 2 series', () => {
    const { component } = setup({
      tvshowsIds: ['abc', 'qsd'],
    });
    expect(component).toMatchSnapshot();
  });

  it('should show spinner when loading', () => {
    const { component } = setup({
      isLoading: true,
    });
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
