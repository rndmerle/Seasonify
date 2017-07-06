/* @flow */
import {
  Button,
  Container,
  Content,
  Form,
  Icon,
  Input,
  Item,
  Label,
  Text,
} from 'native-base';
import { ColorPicker } from 'react-native-color-picker';
import { compose, pure, withHandlers, withState } from 'recompose';
import React from 'react';

import type { Friend } from 'Types';
import { getContrastingTextColor } from 'Libs/Helpers';

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
  isPickerVisible: boolean,
  setPickerVisibility: Function,
  handleChangeName: Function,
  handleColorPatchPress: Function,
  handleColorSelect: Function,
};

const enhance = compose(
  pure,
  withState('isPickerVisible', 'setPickerVisibility', false),
  withHandlers({
    handleChangeName: ({ navigation, editUpdate }: Props) => (name: string) => {
      editUpdate({ id: navigation.state.params.friendId, name });
    },
    handleColorPatchPress: ({ setPickerVisibility }: Props) => () => {
      setPickerVisibility(visibility => !visibility);
    },
    handleColorSelect: ({ friend, friendUpdate }: Props) => (color: string) => {
      friendUpdate({ id: friend.id, color });
    },
  }),
);

function FriendDetails({
  friend,
  isEditing,
  editedObject,
  isPickerVisible,
  handleChangeName,
  handleColorPatchPress,
  handleColorSelect,
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
          <Button
            full
            style={{
              ...styles.colorPatch,
              backgroundColor: friend.color,
            }}
            onPress={handleColorPatchPress}
          >
            <Text style={{ color: getContrastingTextColor(friend.color) }}>Color</Text>
          </Button>
        </Content>
        {isPickerVisible &&
          <ColorPicker
            onColorSelected={handleColorSelect}
            style={styles.colorPicker}
            defaultColor={friend.color}
            oldColor={friend.color}
          />}
      </Container>
    );
  }
  return <Container />;
}

export default enhance(FriendDetails);
