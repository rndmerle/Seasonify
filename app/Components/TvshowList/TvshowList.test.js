import { Container } from 'native-base';
import React from 'react';

import SingleFAB from 'Components/SingleFAB';

import TvshowList from './TvshowList';

function setup(specificProps = {}) {
  const props = {
    tvshows: {},
    navigation: { navigate: jest.fn() },
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
      tvshows: {
        abc: { id: 'abc', name: 'tvshow1' },
        qsd: { id: 'qsd', name: 'tvshow2' },
      },
    });
    expect(component).toMatchSnapshot();
  });

  describe('when clicking on FAB', () => {
    it('should navigate', () => {
      const { component, props } = setup();
      component.find(SingleFAB).simulate('press');
      expect(props.navigation.navigate).toBeCalledWith('TvshowAddPage');
    });
  });
});
