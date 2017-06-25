import React from 'react';

import HeaderModular from '../HeaderModular';

function setup(specificProps = {}) {
  const props = {
    title: 'Some title',
    cancelButton: { icon: 'icon', action: jest.fn() },
    ...specificProps,
  };
  const component = shallow(<HeaderModular {...props} />);
  return {
    component,
    props,
  };
}

const actionButtons = [
  {
    visibleIf: true,
    icon: 'icon1',
    action: jest.fn(),
  },
  {
    visibleIf: false,
    text: 'icon2',
    action: jest.fn(),
  },
  {
    visibleIf: true,
    hideByDefault: true,
    icon: 'icon3',
    action: jest.fn(),
  },
  {
    visibleIf: true,
    hideByDefault: false,
    icon: 'icon4',
    action: jest.fn(),
  },
  { text: 'text1', action: jest.fn() },
  { action: jest.fn() },
];

describe('Rendering', () => {
  it('should render with a basic cancel button', () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });

  it('should render all visible action buttons', () => {
    const { component } = setup({ actionButtons });
    const buttons = component.find('Styled(Button)');
    expect(buttons).toHaveLength(6);
    expect(component).toMatchSnapshot();
  });
});

describe('Events', () => {
  it('should call cancelButton.action', () => {
    const { component, props } = setup();
    component.find('Styled(Button)').simulate('press');
    expect(props.cancelButton.action).toBeCalled();
  });

  it('should call last actionButtons action', () => {
    const { component, props } = setup({ actionButtons });
    component.find('Styled(Button)').last().simulate('press');
    expect(props.actionButtons[actionButtons.length - 1].action).toBeCalled();
  });
});
