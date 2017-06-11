import React from 'react';
import { Toast } from 'native-base';
import Messages from 'Config/Messages';
import { ToastMessage } from '../ToastMessage';

function setup(specificProps = {}) {
  const props = {
    message: { level: 'success', text: 'Success message' },
    messageHide: jest.fn(),
    ...specificProps,
  };
  const component = shallow(<ToastMessage {...props} />);
  return {
    component,
    props,
  };
}

describe('componentWillReceiveProps with a message', () => {
  const { component, props } = setup();
  const fakeDuration = 5;
  beforeEach(() => {
    Toast.show = jest.fn();
    jest.useFakeTimers();
    Messages[props.message.level] = { duration: fakeDuration };
    component.instance().componentWillReceiveProps(props);
  });

  it('should display a Toast with the message', () => {
    expect(Toast.show).toBeCalledWith({ text: props.message.text, duration: fakeDuration });
  });

  it('should messageHide after a moment', () => {
    expect(setTimeout.mock.calls[0][1]).toBe(fakeDuration);
    jest.runAllTimers();
    expect(props.messageHide).toBeCalled();
  });
});

describe('componentWillReceiveProps WITHOUT a message', () => {
  const { component, props } = setup({ message: null });
  beforeEach(() => {
    Toast.show = jest.fn();
    jest.useFakeTimers();
    component.instance().componentWillReceiveProps(props);
  });

  it('shouldnt display a Toast', () => {
    expect(Toast.show).not.toBeCalled();
  });
});
