import React from 'react';
import {
  Form,
  Item,
  Input,
  Icon,
  List,
  ListItem,
  Text,
  Grid,
  Col,
} from 'native-base';

import Poster from '../Components/Poster';

const ShowSheet = ({ isEditing, show, onChangeName }) => (
  <Grid>
    <Col size={38}>
      <Poster url={show.posterURL} />
    </Col>
    <Col size={62}>
      <Form>
        <Item regular>
          {isEditing && <Icon name="create" />}
          <Input
            disabled={!isEditing}
            placeHolder="Name"
            value={show.name}
            onChangeText={onChangeName}
            autoCapitalize="words"
          />
        </Item>
      </Form>
      <List>
        <ListItem>
          <Text note>{show.year}</Text>
        </ListItem>
        <ListItem>
          <Text note>{show.seasonCount} seasons (VO)</Text>
        </ListItem>
      </List>
    </Col>
  </Grid>
);

export default ShowSheet;
