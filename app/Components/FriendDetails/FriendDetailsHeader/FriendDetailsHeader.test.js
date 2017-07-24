import React from 'react';

import HeaderModular from 'Components/HeaderModular';

import FriendDetailsHeader from './FriendDetailsHeader';

function setup(specificProps = {}) {
  const props = {
    friendId: 'abc123',
    navigation: {
      navigate: jest.fn(),
      goBack: jest.fn(),
      state: { params: { friendId: 'abc123' } },
    },
    isEditing: true,
    editedObject: { id: 'abc123', name: 'Edited name' },
    friend: {
      id: 'abc123',
      name: 'Some friend',
    },
    friendDelete: jest.fn(),
    friendUpdate: jest.fn(),
    messageToast: jest.fn(),
    editStart: jest.fn(),
    editEnd: jest.fn(),
    ...specificProps,
  };
  const parent = shallow(<FriendDetailsHeader {...props} />);
  const level = [];
  level[0] = parent;
  level[1] = parent.dive();
  // level[2] = level[1].dive();
  const component = level[1];
  return {
    component,
    parent,
    level,
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

    it('updates friend', () => {
      expect(props.friendUpdate).toBeCalledWith(props.editedObject);
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

    it('updates friend', () => {
      expect(props.friendDelete).toBeCalledWith(props.friendId);
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

    it('doesnt updates friend', () => {
      expect(props.friendUpdate).not.toBeCalled();
    });

    it('doesnt messages', () => {
      expect(props.messageToast).not.toBeCalled();
    });

    it('ends editing', () => {
      expect(props.editEnd).toBeCalled();
    });
  });
});
