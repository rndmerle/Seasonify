import React from 'react';
import TvshowItem from '../TvshowItem';

function setup(props = {}) {
  const defaultProps = {
    tvshowId: 'abc',
    tvshowName: 'Deadwood',
    navigate: jest.fn(),
  };
  const component = shallow(<TvshowItem {...defaultProps} {...props} />);

  return {
    component,
  };
}

describe('rendering', () => {
  describe('with a tvshow name', () => {
    it('should match snapshot', () => {
      const { component } = setup();
      expect(component).toMatchSnapshot();
    });
  });
});
