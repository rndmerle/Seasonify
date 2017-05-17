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

const HeaderModular = ({ title, cancelButton, actionButtons }) => {
  const cancelAction = () => {
    cancelButton.action();
    Keyboard.dismiss();
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
        {actionButtons.map((button, index) => (
          (button.visibleIf || (typeof button.visibleIf === 'undefined' && !button.hideByDefault))
          && <Button key={index} transparent onPress={button.action}>
              {button.text && <Text>{button.text}</Text>}
              {button.icon && <Icon name={button.icon} />}
            </Button>
        ))}
      </Right>
    </Header>
  );
};

export default HeaderModular;
