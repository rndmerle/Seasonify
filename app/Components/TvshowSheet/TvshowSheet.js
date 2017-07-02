/* @flow */
import { Content, Form, Item, Input, Icon, List, ListItem, Text } from 'native-base';
import { pure } from 'recompose';
import React from 'react';

type Props = {
  /* parent */
  name: string,
  year: number,
  localizedName?: string,
  isEditing: boolean,
  edit: Object,
  onChangeName: Function,
  /* connect */
  /* HOC */
};

const enhance = pure;

function TvshowSheet({
  name,
  year,
  localizedName,
  isEditing,
  edit,
  onChangeName,
}: Props) {
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
            <Text note>
              {localizedName}
            </Text>
          </ListItem>}
        <ListItem>
          <Text note>
            {year}
          </Text>
        </ListItem>
      </List>
    </Content>
  );
}

export default enhance(TvshowSheet);
