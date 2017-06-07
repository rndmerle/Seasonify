import React from 'react';
import {
  Content,
  Form,
  Item,
  Input,
  Icon,
  List,
  ListItem,
  Text,
} from 'native-base';

export default function TvshowSheet({
  name,
  year,
  localizedName,
  isEditing,
  edit,
  onChangeName,
}) {
  return (
    <Content>
      <Form>
        <Item regular>
          {isEditing && <Icon name="create" />}
          <Input
            disabled={!isEditing}
            placeHolder="Name"
            value={'name' in edit ? edit.name : name}
            onChangeText={onChangeName}
            autoCapitalize="words"
          />
        </Item>
      </Form>
      <List>
        {localizedName &&
          <ListItem>
            <Text note>{localizedName}</Text>
          </ListItem>}
        <ListItem>
          <Text note>{year}</Text>
        </ListItem>
      </List>
    </Content>
  );
}
