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

const ShowSheet = ({
  name,
  year,
  frenchName,
  isEditing,
  edit,
  onChangeName,
}) => {
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
        {frenchName &&
          <ListItem>
            <Text note>{frenchName}</Text>
          </ListItem>}
        <ListItem>
          <Text note>{year}</Text>
        </ListItem>
      </List>
    </Content>
  );
};

export default ShowSheet;
