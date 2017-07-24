/* @flow */
import { Button, Col, Grid, Icon, Left, List, ListItem, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

import { Metrics } from 'Themes';
import { getContrastingTextColor } from 'Libs/Helpers';

import styles from './SeasonList.style';

type Props = {
  /* parent */
  tvshowId: string,
  seasons: Seasons,
  navigation: Object,
  /* connect */
  seasonViewings: { [season: string]: ViewerInfo[] },
  friends: Friends,
  viewingUpdate: Function,
  viewingUnview: Function,
  /* HOC */
  handleViewerPress: Function,
  handleViewerLongPress: Function,
  handleSeasonPress: Function,
};

const enhance = compose(
  withHandlers({
    handleViewerPress: ({ navigation }: Props) => (viewer: ViewerInfo) => {
      navigation.navigate('FriendDetailsPage', { friendId: viewer.friendId });
    },
    handleViewerLongPress: ({ tvshowId, viewingUnview }: Props) => (
      viewer: ViewerInfo,
    ) => {
      viewingUnview(tvshowId, viewer.friendId);
    },
    handleSeasonPress: ({ navigation, tvshowId, friends, viewingUpdate }: Props) => (
      seasonId: string,
    ) => {
      navigation.navigate('PickPage', {
        title: 'Who watched that season?',
        isMultiSelection: false,
        collection: friends,
        onSelect: friendId => {
          /* istanbul ignore next */
          viewingUpdate(tvshowId, friendId, seasonId);
        },
      });
    },
  }),
  pure,
);

const getBadgeBgColor = (color: string) => ({ backgroundColor: color });

const getBadgeColor = (color: string) => ({ color: getContrastingTextColor(color) });

function SeasonList({
  seasons,
  seasonViewings,
  handleViewerPress,
  handleViewerLongPress,
  handleSeasonPress,
}: Props) {
  return (
    <List>
      {seasons &&
        objectValues(seasons).reverse().map(season =>
          (<ListItem key={season.id}>
            <Grid>
              <Col size={Metrics.columnLeft}>
                <TouchableOpacity
                  transparent
                  style={styles.seasonHeader}
                  onPress={() => handleSeasonPress(season.id)}
                >
                  <Left style={styles.seasonButton}>
                    <Icon name="add-circle" />
                  </Left>
                  <Text style={styles.seasonTitle}>{`Season ${season.id}`}</Text>
                  <Text note style={styles.seasonInfos}>
                    {season.episodes && `${season.episodes} ep.`}
                    {season.year && ` in ${season.year}`}
                  </Text>
                </TouchableOpacity>
              </Col>
              <Col size={Metrics.columnRight} style={styles.viewerList}>
                {seasonViewings[season.id] &&
                  seasonViewings[season.id].map(viewer =>
                    (<Button
                      small
                      key={viewer.friendId}
                      style={{ ...styles.viewer, ...getBadgeBgColor(viewer.color) }}
                      onPress={() => handleViewerPress(viewer)}
                      onLongPress={() => handleViewerLongPress(viewer)}
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