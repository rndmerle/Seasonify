import React from 'react';
import HeaderRoot from '../HeaderRoot';

function setup(specificProps = {}) {
  const props = {
    title: 'Some tvshow',
    navigation: { navigate: jest.fn() },
    ...specificProps,
  };
  const component = shallow(<HeaderRoot {...props} />);
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
    component.find('Styled(Button)').simulate('press');
    expect(props.navigation.navigate).toBeCalledWith('DrawerOpen');
  });
});
