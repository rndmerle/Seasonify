import React from 'react';
import { List, ListItem, Text, Grid, Col, Badge } from 'native-base';

import { Metrics, AtomicStyles } from '../Themes';

const SeasonList = ({ seasons }) => (
  <List>
    {seasons &&
      Object.keys(seasons).reverse().map(id => (
        <ListItem key={id}>
          <Grid>
            <Col size={Metrics.columnLeft} style={AtomicStyles.noFlex}>
              <Badge info>
                <Text>{`Season ${id}`}</Text>
              </Badge>
              <Text note>
                {seasons[id].episodes && `${seasons[id].episodes} ep. `}
                {seasons[id].year && `in ${seasons[id].year}`}
              </Text>
            </Col>
            <Col size={Metrics.columnRight}>
              {/* <Text>Renaud, Sylvain, Papa&Maman</Text> */}
            </Col>
          </Grid>
        </ListItem>
      ))}
  </List>
);

export default SeasonList;
