/* @flow */
import { Animated, StyleSheet } from 'react-native';
import { Button, Left, ListItem, Right, Text, View } from 'native-base';
import React from 'react';

import type { Message, Toast } from 'Types';
import ToastConfig from 'Config/ToastConfig';

import styles from './ToastMessage.style';

type DefaultProps = {
  useNativeDriver: boolean,
};

type Props = {
  message: Message,
  useNativeDriver: boolean,
  messageReset: Function,
  dispatch: Function,
};

type State = {
  modalShown: boolean,
  message?: ?Message,
  toastConfig: Toast,
  animationTiming: {
    duration: number,
    useNativeDriver: boolean,
  },
  height: number,
};

export default class ToastMessage extends React.Component<DefaultProps, Props, State> {
  static defaultProps = {
    useNativeDriver: true,
  };

  constructor(props: Props) {
    super(props);
    this.state.animationTiming.useNativeDriver = props.useNativeDriver;
  }

  state = {
    modalShown: false,
    message: undefined,
    toastConfig: ToastConfig.neutral,
    animationTiming: {
      duration: 350,
      useNativeDriver: true,
    },
    height: 0,
  };

  componentWillReceiveProps({ message }: Props) {
    if (message) {
      this.resetAnimation();

      /* istanbul ignore if. (A toast already displayed) */
      if (this.state.modalShown && this.closeTimeout) {
        this.removeCloseTimeout();
      }

      this.setState(
        {
          message,
          toastConfig: ToastConfig[message.level],
          height: this.heightFromStyles(),
        },
        this.openToast,
      );
    } else {
      this.closeToast();
    }
  }

  animation = new Animated.Value(0);
  closeTimeout = null;

  heightFromStyles = (): number => StyleSheet.flatten(styles.container).height;

  handleButtonCallback = () => {
    if (this.state.message && this.state.message.callback) {
      this.props.dispatch(this.state.message.callback);
    }
    this.closeToast();
  };

  handleToastPress = () => {
    this.closeToast();
  };

  resetAnimation() {
    this.animation = new Animated.Value(0);
  }

  showModal = () => {
    this.setState({ modalShown: true });
  };

  hideModal = () => {
    this.setState({ modalShown: false });
  };

  openToast = () => {
    this.showModal();
    this.programCloseToast();
    Animated.timing(this.animation, {
      ...this.state.animationTiming,
      toValue: 1,
    }).start();
  };

  programCloseToast = () => {
    this.closeTimeout = setTimeout(() => {
      this.props.messageReset();
    }, this.state.toastConfig.duration);
  };

  closeToast = () => {
    Animated.timing(this.animation, {
      ...this.state.animationTiming,
      toValue: 0,
    }).start(this.hideModal);

    this.removeCloseTimeout();
  };

  removeCloseTimeout = () => {
    clearTimeout(this.closeTimeout);
  };

  render() {
    const { message, toastConfig, height } = this.state;

    if (message && message.text) {
      const interpolated = this.animation.interpolate({
        inputRange: [0, 0.3, 1],
        outputRange: [0, height * -1 + 10, height * -1],
      });

      return (
        <View>
          <Animated.View
            style={[
              styles.container,
              styles[toastConfig.level],
              {
                transform: [{ translateY: interpolated }],
              },
            ]}
          >
            <ListItem onPress={this.handleToastPress}>
              <Left>
                <Text style={StyleSheet.flatten(styles.text)}>
                  {message.text}
                </Text>
              </Left>
              {message.button &&
                <Right>
                  <Button transparent onPress={this.handleButtonCallback}>
                    <Text style={StyleSheet.flatten(styles.buttonText)}>
                      {message.button}
                    </Text>
                  </Button>
                </Right>}
            </ListItem>
          </Animated.View>
        </View>
      );
    }

    return null;
  }
}
