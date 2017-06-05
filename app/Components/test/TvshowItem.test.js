import React from 'react';
import TvshowItem from '../TvshowItem';

function setup(specificProps = {}) {
  const props = {
    tvshowId: 'abc',
    tvshowName: 'Deadwood',
    navigate: jest.fn(),
    ...specificProps,
  };
  const component = shallow(<TvshowItem {...props} />);
  return {
    component,
    props,
    actions: {},
  };
}

describe('rendering', () => {
  describe('with a tvshow name', () => {
    it('should match snapshot', () => {
      const { component } = setup();
      expect(component).toMatchSnapshot();
    });

    describe('when clicking on list item', () => {
      it('should navigate with tvshow params', () => {
        const { component, props } = setup();
        component.find('Styled(ListItem)').simulate('press');
        expect(props.navigate).toBeCalledWith('TvshowDetails', {
          tvshowId: props.tvshowId,
          tvshowName: props.tvshowName,
        });
      });
    });
  });
});
