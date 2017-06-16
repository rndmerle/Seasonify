/* @flow */
import React from 'react';
import { List, ListItem, Text, Grid, Col, Badge } from 'native-base';

import type { Seasons } from 'Types';
import { Metrics, AtomicStyles } from 'Themes';

export default function SeasonList({ seasons }: { seasons: Seasons }) {
  return (
    <List>
      {seasons &&
        objectValues(seasons).reverse().map(season =>
          (<ListItem key={season.id}>
            <Grid>
              <Col size={Metrics.columnLeft} style={AtomicStyles.noFlex}>
                <Badge info>
                  <Text>{`Season ${season.id}`}</Text>
                </Badge>
                <Text note>
                  {season.episodes && `${season.episodes} ep. `}
                  {season.year && `in ${season.year}`}
                </Text>
              </Col>
              <Col size={Metrics.columnRight}>
                {/* <Text>Renaud, Sylvain, Papa&Maman</Text> */}
              </Col>
            </Grid>
          </ListItem>),
        )}
    </List>
  );
}
