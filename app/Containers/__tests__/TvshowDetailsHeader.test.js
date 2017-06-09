import React from 'react';
import { TvshowDetailsHeader } from '../TvshowDetailsHeader';

function setup(specificProps = {}) {
  const props = {
    tvshowId: 'abc123',
    navigate: jest.fn(),
    isEditing: false,
    editedObject: {},
    getTvshow: {
      id: 'abc123',
      name: 'Some tvshow',
    },
    tvshowRemove: jest.fn(),
    tvshowUpdate: jest.fn(),
    messageToast: jest.fn(),
    editStart: jest.fn(),
    editEnd: jest.fn(),
    ...specificProps,
  };
  const component = shallow(<TvshowDetailsHeader {...props} />);
  return {
    component,
    props,
  };
}

describe('Rendering', () => {
  it('should render, when not editing', () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });

  it('should render, when editing', () => {
    const { component } = setup({ isEditing: true });
    expect(component).toMatchSnapshot();
  });
});
