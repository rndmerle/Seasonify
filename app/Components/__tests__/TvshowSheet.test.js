import React from 'react';
import TvshowSheet from '../TvshowSheet';

function setup(specificProps = {}) {
  const props = {
    name: "Turn : Washington's Spies",
    localizedName: undefined,
    year: 2014,
    isEditing: false,
    edit: {},
    onChangeName: jest.fn(),
    ...specificProps,
  };
  const component = shallow(<TvshowSheet {...props} />);
  return {
    component,
    props,
  };
}

describe('Rendering', () => {
  it('should match', () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });

  it('should match, when in editing mode', () => {
    const { component } = setup({ isEditing: true });
    expect(component).toMatchSnapshot();
  });

  it('should match, when form is edited', () => {
    const { component } = setup({
      isEditing: true,
      edit: { name: 'TURN', year: '2015' },
    });
    expect(component).toMatchSnapshot();
  });

  it('should match, when localized name is present', () => {
    const { component } = setup({ localizedName: 'Turn' });
    expect(component).toMatchSnapshot();
  });
});

describe('Events', () => {
  it('should call onChangeName, when changing text', () => {
    const { component, props } = setup();
    component.find('Styled(Input)').simulate('changeText');
    expect(props.onChangeName).toBeCalled();
  });
});
