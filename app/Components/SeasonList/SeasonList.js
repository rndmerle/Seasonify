/* @flow */
import { List, ListItem, Text, Grid, Col, Badge } from 'native-base';
import { pure } from 'recompose';
import React from 'react';

import type { Seasons } from 'Types';
import { Metrics, AtomicStyles } from 'Themes';

type Props = {
  /* parent */
  seasons: Seasons,
  /* connect */
  /* state */
  /* handlers */
};

const enhance = pure;

function SeasonList({ seasons }: Props) {
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

export default enhance(SeasonList);
