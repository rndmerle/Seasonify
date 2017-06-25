/* @flow */
import { Content, Form, Item, Input, Icon, List, ListItem, Text } from 'native-base';
import React from 'react';

export default function TvshowSheet({
  name,
  year,
  localizedName = '',
  isEditing,
  edit,
  onChangeName,
}: {
  name: string,
  year: number,
  localizedName?: string,
  isEditing: boolean,
  edit: Object,
  onChangeName: Function,
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
