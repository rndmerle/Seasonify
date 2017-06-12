/* @flow */
import React from 'react';
import { Keyboard } from 'react-native';
import { Header, Title, Left, Right, Body, Button, Icon, Text } from 'native-base';
import type { HeaderButton } from 'Types';

export default function HeaderModular({
  title,
  cancelButton,
  actionButtons = [],
}: {
  title: string,
  cancelButton: HeaderButton,
  actionButtons: HeaderButton[],
}) {
  const cancelAction = () => {
    cancelButton.action();
    Keyboard.dismiss();
  };

  const renderTextOrIcon = (button: HeaderButton) => {
    if (button.icon) return <Icon name={button.icon} />;
    if (button.text) return <Text>{button.text}</Text>;
    return null;
  };

  const renderButton = () =>
    actionButtons.map((button, index) => {
      if (
        button.visibleIf ||
        (typeof button.visibleIf === 'undefined' && !button.hideByDefault)
      ) {
        return (
          /* eslint-disable react/no-array-index-key */
          <Button key={index} transparent onPress={button.action}>
            {renderTextOrIcon(button)}
          </Button>
        );
      }
      return null;
    });

  return (
    <Header>
      <Left>
        <Button transparent onPress={cancelAction}>
          {renderTextOrIcon(cancelButton)}
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
}
