/* @flow */
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

type Props = {
  /* parent */
  title: string,
  navigation: Object,
  toggleButton?: ReactComponent<*, *, *>,
  /* connect */
  /* HOC */
  handleDrawer: Function,
};

const enhance = compose(
  pure,
  withHandlers({
    handleDrawer: ({ navigation }: Props) => () => {
      navigation.navigate('DrawerOpen');
    },
  }),
);

function HeaderRoot({ title, handleDrawer, toggleButton }: Props) {
  return (
    <Header>
      <Left>
        <Button transparent onPress={handleDrawer}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>
          {title}
        </Title>
      </Body>
      <Right>
        {toggleButton || null}
      </Right>
    </Header>
  );
}

export default enhance(HeaderRoot);
