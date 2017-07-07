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
import { compose, pure, withHandlers, withState } from 'recompose';
import React from 'react';

import AppConfig from 'Config/AppConfig';
import FriendItem from 'Components/FriendItem';
import Identity from 'Libs/Identity';

type Props = {
  /* parent */
  navigation: Object,
  /* connect */
  friendsArray: Friend[],
  friendAdd: Function,
  /* HOC */
  newFriendName: string,
  setNewFriendName: Function,
  handleChangeName: Function,
  handleAddButton: Function,
};

const enhance = compose(
  pure,
  withState('newFriendName', 'setNewFriendName', ''),
  withHandlers({
    handleChangeName: ({ setNewFriendName }: Props) => (name: string) => {
      setNewFriendName(name);
    },
    handleAddButton: ({ friendAdd, newFriendName, setNewFriendName }: Props) => () => {
      if (newFriendName.trim() !== '') {
        friendAdd(Identity.newid(), newFriendName.trim(), AppConfig.defaultFriendColor);
        setNewFriendName('');
        Keyboard.dismiss();
      }
    },
  }),
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
