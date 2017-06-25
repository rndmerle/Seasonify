import React from 'react';

import FriendItem from '../FriendItem';

function setup(specificProps = {}) {
  const props = {
    friend: { name: 'Someone' },
    navigate: jest.fn(),
    ...specificProps,
  };
  const component = shallow(<FriendItem {...props} />);
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
    component.find('Styled(ListItem)').simulate('press');
    expect(props.navigate).toBeCalledWith('FriendDetailsPage', {
      friend: { name: 'Someone' },
    });
  });
});
