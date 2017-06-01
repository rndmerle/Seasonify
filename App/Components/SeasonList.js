import React from 'react';
import { List, ListItem, Text, Grid, Col, Badge } from 'native-base';

const SeasonList = ({ seasons }) => {
  return (
    <List>
      {seasons &&
        Object.keys(seasons).reverse().map(id => (
          <ListItem key={id}>
            <Grid>
              <Col size={38}>
                <Badge info>
                  <Text>{`Season ${id}`}</Text>
                </Badge>
                <Text
                  note
                >{`${seasons[id].episodes} ep. in ${seasons[id].year}`}</Text>
              </Col>
              <Col size={62}>
                {/* <Text>Renaud, Sylvain, Papa&Maman</Text> */}
              </Col>
            </Grid>
          </ListItem>
        ))}
    </List>
  );
};

export default SeasonList;
