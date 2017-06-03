import React from 'react';
import { TvshowList } from 'app/Containers/TvshowList';

function setup(props = {}) {
  const defaultProps = {
    tvshows: {},
    navigation: { navigate: jest.fn() },
  };
  const component = shallow(<TvshowList {...defaultProps} {...props} />);

  return {
    component,
  };
}

describe('rendering', () => {
  describe('with 2 tvshows list', () => {
    it('should show 2 series', () => {
      const { component } = setup({
        tvshows: {
          abc: { id: 'abc', name: 'tvshow1' },
          qsd: { id: 'qsd', name: 'tvshow2' },
        },
      });
      expect(component.find('TvshowItem')).toHaveLength(2);
    });
  });
});
