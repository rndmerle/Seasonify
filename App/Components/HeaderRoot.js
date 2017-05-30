import React, { PropTypes } from 'react';
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base';

const HeaderRoot = ({ title, navigation }) => {
  const openDrawer = () => {
    console.log(navigation);
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
};

export default HeaderRoot;
