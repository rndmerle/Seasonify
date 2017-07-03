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
  Label,
  Left,
  ListItem,
  Picker,
} from 'native-base';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

import type { Friend } from 'Types';
import cssColors from 'Themes/cssColors';

import styles from './FriendDetails.style';

type Props = {
  /* parent */
  navigation: Object,
  /* connect */
  friend: Friend,
  isEditing: boolean,
  editedObject: Object,
  editUpdate: Function,
  friendUpdate: Function,
  /* HOC */
  handleChangeName: Function,
  handleChangeColor: Function,
};

const enhance = compose(
  pure,
  withHandlers({
    handleChangeName: ({ navigation, editUpdate }: Props) => (name: string) => {
      editUpdate({ id: navigation.state.params.friendId, name });
    },
    handleChangeColor: ({ navigation, friendUpdate }: Props) => (color: string) => {
      friendUpdate({ id: navigation.state.params.friendId, color });
    },
  }),
);

function FriendDetails({
  friend,
  isEditing,
  editedObject,
  handleChangeName,
  handleChangeColor,
}: Props) {
  if (friend) {
    return (
      <Container>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Name</Label>
              {isEditing && <Icon name="create" />}
              <Input
                disabled={!isEditing}
                value={'name' in editedObject ? editedObject.name : friend.name}
                onChangeText={handleChangeName}
                autoCapitalize="words"
              />
            </Item>
          </Form>
          <ListItem icon>
            <Left>
              <Button
                disabled
                style={{
                  ...styles.colorPatch,
                  backgroundColor: friend.color,
                }}
              />
            </Left>
            <Body>
              <Picker
                note
                iosHeader="Select a color"
                selectedValue={friend.color}
                onValueChange={handleChangeColor}
                mode="dropdown"
              >
                {Object.keys(cssColors).map((color: string) =>
                  <Picker.Item key={color} label={color} value={color} />,
                )}
              </Picker>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
  return <Container />;
}

export default enhance(FriendDetails);
