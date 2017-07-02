/* @flow */
import { Header, Title, Left, Right, Body, Button, Icon, Text } from 'native-base';
import { Keyboard } from 'react-native';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

import type { HeaderButton } from 'Types';

type Props = {
  /* parent */
  title: string,
  cancelButton: HeaderButton,
  actionButtons?: HeaderButton[],
  /* connect */
  /* HOC */
  handleCancel: Function,
};

const enhance = compose(
  pure,
  withHandlers({
    handleCancel: ({ cancelButton }: Props) => () => {
      cancelButton.action();
      Keyboard.dismiss();
    },
  }),
);

function HeaderModular({ title, cancelButton, actionButtons = [], handleCancel }: Props) {
  const renderTextOrIcon = (button: HeaderButton) => {
    if (button.icon) return <Icon name={button.icon} />;
    if (button.text) {
      return (
        <Text>
          {button.text}
        </Text>
      );
    }
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
        <Button transparent onPress={handleCancel}>
          {renderTextOrIcon(cancelButton)}
        </Button>
      </Left>
      <Body>
        <Title>
          {title}
        </Title>
      </Body>
      <Right>
        {renderButton()}
      </Right>
    </Header>
  );
}

export default enhance(HeaderModular);
