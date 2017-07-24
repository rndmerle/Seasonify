import React from 'react';

import HeaderModular from 'Components/HeaderModular';

import TvshowDetailsHeader from './TvshowDetailsHeader';

function setup(specificProps = {}) {
  const props = {
    tvshowId: 'abc123',
    navigation: {
      navigate: jest.fn(),
      goBack: jest.fn(),
      state: { params: { tvshowId: 'abc123' } },
    },
    isEditing: true,
    editedObject: { id: 'abc123' },
    tvshow: {
      id: 'abc123',
      name: 'Some tvshow',
    },
    tvshowDelete: jest.fn(),
    tvshowUpdate: jest.fn(),
    messageToast: jest.fn(),
    editStart: jest.fn(),
    editEnd: jest.fn(),
    ...specificProps,
  };
  const component = shallowDive(<TvshowDetailsHeader {...props} />, HeaderModular);
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
  const headerModular = component.find(HeaderModular);

  describe("when calling cancelButton's action", () => {
    headerModular.prop('cancelButton').action();

    it('navigates', () => {
      expect(props.navigation.goBack).toBeCalled();
    });

    it('ends edit', () => {
      expect(props.editEnd).toBeCalled();
    });
  });

  describe('when calling first actionButton action', () => {
    headerModular.prop('actionButtons')[0].action();

    it('starts editing', () => {
      expect(props.editStart).toBeCalled();
    });
  });

  describe('when calling second actionButton action', () => {
    headerModular.prop('actionButtons')[1].action();

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
    headerModular.prop('actionButtons')[2].action();

    it('navigates', () => {
      expect(props.navigation.goBack).toBeCalled();
    });

    it('updates tvshow', () => {
      expect(props.tvshowDelete).toBeCalledWith(props.tvshowId);
    });

    it('messages', () => {
      expect(props.messageToast).toBeCalled();
    });
  });
});

/* ========= Functions ========= */

describe('Functions, when NOT editing', () => {
  const { component, props } = setup({ isEditing: false, editedObject: {} });
  const headerModular = component.find(HeaderModular);

  describe('when calling second actionButton action', () => {
    headerModular.prop('actionButtons')[1].action();

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
