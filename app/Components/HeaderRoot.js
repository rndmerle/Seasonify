import React from 'react';
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base';

export default function HeaderRoot({
  title,
  navigation,
}: {
  title: string,
  navigation: Object,
}) {
  const openDrawer = () => {
    navigation.navigate('DrawerOpen');
  };
  return (
    <Header>
      <Left>
        <Button transparent onPress={openDrawer}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right />
    </Header>
  );
}
