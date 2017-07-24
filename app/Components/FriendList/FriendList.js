/* @flow */
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Icon,
  Input,
  Item,
  List,
  ListItem,
  Right,
} from 'native-base';
import { Keyboard } from 'react-native';
import { compose, pure, withHandlers, withStateHandlers } from 'recompose';
import React from 'react';

import AppConfig from 'Config/AppConfig';
import Identity from 'Libs/Identity';

import FriendItem from './FriendItem';

type Props = {
  /* parent */
  navigation: Object,
  /* connect */
  friendsArray: Friend[],
  friendAdd: Function,
  /* HOC */
  newFriendName: string,
  handleChangeName: Function,
  handleAddButton: Function,
};

type State = {
  newFriendName: string,
};

const enhance = compose(
  withStateHandlers(() => ({ newFriendName: '' }: State), {
    handleChangeName: () => (name: string) => ({
      newFriendName: name,
    }),
  }),
  withHandlers({
    handleAddButton: ({ friendAdd, newFriendName, handleChangeName }: Props) => () => {
      if (newFriendName.trim() !== '') {
        friendAdd(Identity.newid(), newFriendName.trim(), AppConfig.defaultFriendColor);
        handleChangeName('');
        Keyboard.dismiss();
      }
    },
  }),
  pure,
);

function FriendList({
  navigation,
  friendsArray,
  newFriendName,
  handleChangeName,
  handleAddButton,
}: Props) {
  return (
    <Container>
      <Content>
        <List>
          {friendsArray.map(friend =>
            <FriendItem key={friend.id} friend={friend} navigate={navigation.navigate} />,
          )}
        </List>
      </Content>
      <ListItem>
        <Body>
          <Form>
            <Item regular>
              <Input
                placeholder="Add a new friend"
                onChangeText={handleChangeName}
                value={newFriendName}
                autoCapitalize="words"
              />
            </Item>
          </Form>
        </Body>
        <Right>
          <Button onPress={handleAddButton}>
            <Icon name="add" />
          </Button>
        </Right>
      </ListItem>
    </Container>
  );
}

export default enhance(FriendList);
