import { Button } from 'native-base';
import React from 'react';

import ToastConfig from 'Config/ToastConfig';

import ToastMessage from './ToastMessage';

function setup(specificProps = {}) {
  const props = {
    message: null,
    useNativeDriver: false,
    messageReset: jest.fn(),
    dispatch: jest.fn(),
    ...specificProps,
  };
  const component = shallow(<ToastMessage {...props} />);
  return {
    component,
    props,
  };
}

describe('Rendering an empty message', () => {
  jest.useFakeTimers();
  const { props, component } = setup();

  it('should match initial state', () => {
    expect(component).toMatchSnapshot();
  });

  describe('when receiving an empty message as a prop', () => {
    beforeEach(() => {
      component.setProps({
        ...props,
        message: null,
      });
    });

    it('should match hidden state', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('when receiving message as a prop', () => {
    const fakeDuration = 5;
    beforeEach(() => {
      ToastConfig.success = { duration: fakeDuration };
      // setProps triggers componentWillReceiveProps too
      component.setProps({
        ...props,
        message: { level: 'success', text: 'Success message' },
      });
    });

    it('should match displayed state', () => {
      expect(component).toMatchSnapshot();
    });

    // TODO: Not working because Jest 20 doesn't call the setState's callback
    // cf. https://github.com/airbnb/enzyme/issues/953 and https://github.com/gitim/react-native-sortable-list/issues/50
    // it('should messageReset after a moment', () => {
    //   expect(setTimeout.mock.calls.length).toBe(1);
    //   expect(setTimeout.mock.calls[0][1]).toBe(fakeDuration);
    //   jest.runAllTimers();
    //   expect(props.messageReset).toBeCalled();
    // });
  });
});

describe('Rendering a warning message with an undo button', () => {
  const { props: initProps, component } = setup();
  const props = {
    ...initProps,
    message: {
      level: 'warning',
      text: 'Warning message',
      button: 'UNDO',
      callback: { type: 'UNDO' },
    },
  };
  component.setProps(props);

  it('should match', () => {
    expect(component).toMatchSnapshot();
  });

  describe('when calling onPress on ChildButton', () => {
    const childButton = component.find(Button);
    childButton.props().onPress();

    it('calls dispatch with the action', () => {
      expect(props.dispatch).toBeCalledWith(props.message.callback);
    });
  });
});
