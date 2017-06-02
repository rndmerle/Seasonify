/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Keyboard } from 'react-native';
import {
  Header,
  Title,
  Left,
  Right,
  Body,
  Button,
  Icon,
  Text,
} from 'native-base';

const HeaderModular = ({ title, cancelButton, actionButtons = [] }) => {
  const cancelAction = () => {
    cancelButton.action();
    Keyboard.dismiss();
  };
  const renderButton = () => {
    return actionButtons.map((button, index) => {
      if (
        button.visibleIf ||
        (typeof button.visibleIf === 'undefined' && !button.hideByDefault)
      ) {
        console.log(button);
        return (
          <Button key={index} transparent onPress={button.action}>
            {button.icon
              ? <Icon name={button.icon} />
              : <Text>{button.text}</Text>}
          </Button>
        );
      }
      return null;
    });
  };

  return (
    <Header>
      <Left>
        <Button transparent onPress={cancelAction}>
          <Icon name={cancelButton.icon} />
        </Button>
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right>
        {renderButton()}
      </Right>
    </Header>
  );
};

export default HeaderModular;
