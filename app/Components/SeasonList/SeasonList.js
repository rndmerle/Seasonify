/* @flow */
import { Button, Col, Grid, List, ListItem, Text } from 'native-base';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

import { Metrics } from 'Themes';
import type { Seasons, ViewerInfo } from 'Types';
import { getContrastingTextColor } from 'Libs/Helpers';

import styles from './SeasonList.style';

type Props = {
  /* parent */
  seasons: Seasons,
  navigation: Object,
  /* connect */
  seasonViewings: { [season: string]: ViewerInfo[] },
  /* HOC */
  handleViewerPress: Function,
};

const enhance = compose(
  pure,
  withHandlers({
    handleViewerPress: ({ navigation }: Props) => (viewer: ViewerInfo) => {
      navigation.navigate('FriendDetailsPage', {
        friendId: viewer.friendId,
        friendName: viewer.name,
      });
    },
  }),
);

const getBadgeBgColor = (color: string) => ({ backgroundColor: color });

const getBadgeColor = (color: string) => ({ color: getContrastingTextColor(color) });

function SeasonList({ seasons, seasonViewings, handleViewerPress }: Props) {
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
                    (<Button
                      small
                      key={viewer.friendId}
                      style={{ ...styles.viewer, ...getBadgeBgColor(viewer.color) }}
                      onPress={() => handleViewerPress(viewer)}
                    >
                      <Text style={getBadgeColor(viewer.color)}>
                        {viewer.name}
                      </Text>
                    </Button>),
                  )}
              </Col>
            </Grid>
          </ListItem>),
        )}
    </List>
  );
}

export default enhance(SeasonList);
