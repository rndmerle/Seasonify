/* @flow */
import { Container, Content, Form, Icon, Input, Item, Label } from 'native-base';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

import type { Friend } from 'Types';

type Props = {
  /* parent */
  navigation: Object,
  /* connect */
  friend: Friend,
  isEditing: boolean,
  editedObject: Object,
  editUpdate: Function,
  /* HOC */
  handleChangeName: Function,
};

const enhance = compose(
  pure,
  withHandlers({
    handleChangeName: ({ navigation, editUpdate }: Props) => (name: string) => {
      editUpdate({ id: navigation.state.params.friendId, name });
    },
  }),
);

function FriendDetails({ friend, isEditing, editedObject, handleChangeName }: Props) {
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
        </Content>
      </Container>
    );
  }
  return <Container />;
}

export default enhance(FriendDetails);
