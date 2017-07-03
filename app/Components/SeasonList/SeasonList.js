/* @flow */
import { List, ListItem, Text, Grid, Col, Badge } from 'native-base';
import { pure } from 'recompose';
import React from 'react';

import { Metrics } from 'Themes';
import type { Seasons, ViewerInfo } from 'Types';

import styles from './SeasonList.style';

type Props = {
  /* parent */
  seasons: Seasons,
  /* connect */
  seasonViewings: { [season: string]: ViewerInfo[] },
  /* HOC */
};

const enhance = pure;

function SeasonList({ seasons, seasonViewings }: Props) {
  return (
    <List>
      {seasons &&
        objectValues(seasons).reverse().map(season =>
          (<ListItem key={season.id}>
            <Grid>
              <Col size={Metrics.columnLeft} style={styles.seasonHeader}>
                <Text style={styles.seasonTitle}>{`Season ${season.id}`}</Text>
                <Text note style={styles.seasonInfos}>
                  {season.episodes && `${season.episodes} ep.`}
                  {season.year && ` in ${season.year}`}
                </Text>
              </Col>
              <Col size={Metrics.columnRight} style={styles.viewerList}>
                {seasonViewings[season.id] &&
                  seasonViewings[season.id].map(viewer =>
                    (<Badge key={viewer.friendId} style={styles.viewer}>
                      <Text>
                        {viewer.name}
                      </Text>
                    </Badge>),
                  )}
              </Col>
            </Grid>
          </ListItem>),
        )}
    </List>
  );
}

export default enhance(SeasonList);
