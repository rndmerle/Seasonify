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

describe('Rendering', () => {
  it('should match, with a tvshowName', () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });

  it('should match, with an empty tvshowName', () => {
    const { component } = setup({ tvshowName: '' });
    expect(component).toMatchSnapshot();
  });
});

describe('Events', () => {
  it('should navigate with tvshow params, when clicking on list item', () => {
    const { component, props } = setup();
    component.find('Styled(ListItem)').simulate('press');
    expect(props.navigate).toBeCalledWith('TvshowDetails', {
      tvshowId: props.tvshowId,
      tvshowName: props.tvshowName,
    });
  });
});
