import React from 'react';
import { StyleSheet } from 'react-native';
import { List, ListItem, Text, Grid, Col, Badge } from 'native-base';

import { AtomicStyles } from '../Themes';

const SeasonList = ({ seasons }) => {
  return (
    <List>
      {seasons &&
        Object.keys(seasons).reverse().map(id => (
          <ListItem key={id}>
            <Grid>
              <Col size={38} style={AtomicStyles.noFlex}>
                <Badge info>
                  <Text>{`Season ${id}`}</Text>
                </Badge>
                <Text note>
                  {seasons[id].episodes && `${seasons[id].episodes} ep. `}
                  {seasons[id].year && `in ${seasons[id].year}`}
                </Text>
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
