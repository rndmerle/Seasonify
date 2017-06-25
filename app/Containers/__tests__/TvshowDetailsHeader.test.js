import React from 'react';

import { TvshowDetailsHeader } from '../TvshowDetailsHeader';

function setup(specificProps = {}) {
  const props = {
    tvshowId: 'abc123',
    navigate: jest.fn(),
    isEditing: true,
    editedObject: { id: 'abc123' },
    tvshow: {
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

  it('should render, when not editing', () => {
    const { component } = setup({ isEditing: false, editedObject: {} });
    expect(component).toMatchSnapshot();
  });
});

/* ========= Functions ========= */

describe('Functions, when editing', () => {
  const { component, props } = setup();
  const HeaderModular = component.find('HeaderModular');

  describe("when calling cancelButton's action", () => {
    HeaderModular.prop('cancelButton').action();

    it('navigates', () => {
      expect(props.navigate).toBeCalledWith('TvshowListPage');
    });

    it('ends edit', () => {
      expect(props.editEnd).toBeCalled();
    });
  });

  describe('when calling first actionButton action', () => {
    HeaderModular.prop('actionButtons')[0].action();

    it('starts editing', () => {
      expect(props.editStart).toBeCalled();
    });
  });

  describe('when calling second actionButton action', () => {
    HeaderModular.prop('actionButtons')[1].action();

    it('updates tvshow', () => {
      expect(props.tvshowUpdate).toBeCalledWith(props.editedObject);
    });

    it('messages', () => {
      expect(props.messageToast).toBeCalled();
    });

    it('ends editing', () => {
      expect(props.editEnd).toBeCalled();
    });
  });

  describe('when calling third actionButton action', () => {
    HeaderModular.prop('actionButtons')[2].action();

    it('navigates', () => {
      expect(props.navigate).toBeCalledWith('TvshowListPage');
    });

    it('updates tvshow', () => {
      expect(props.tvshowRemove).toBeCalledWith(props.tvshowId);
    });

    it('messages', () => {
      expect(props.messageToast).toBeCalled();
    });
  });
});

/* ========= Functions ========= */

describe('Functions, when NOT editing', () => {
  const { component, props } = setup({ isEditing: false, editedObject: {} });
  const HeaderModular = component.find('HeaderModular');

  describe('when calling second actionButton action', () => {
    HeaderModular.prop('actionButtons')[1].action();

    it('doesnt updates tvshow', () => {
      expect(props.tvshowUpdate).not.toBeCalled();
    });

    it('doesnt messages', () => {
      expect(props.messageToast).not.toBeCalled();
    });

    it('ends editing', () => {
      expect(props.editEnd).toBeCalled();
    });
  });
});
