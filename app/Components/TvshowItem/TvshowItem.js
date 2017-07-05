/* @flow */
import { Body, Button, Left, ListItem, Text, Thumbnail, View } from 'native-base';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

import type { Tvshow, ViewerInfo } from 'Types';

import styles from './TvshowItem.style';

type Props = {
  /* parent */
  tvshowId: string,
  navigate: Function,
  /* connect */
  tvshow: Tvshow,
  seasonsCount: number,
  viewers: ViewerInfo[],
  /* HOC */
  handlePress: Function,
};

const enhance = compose(
  pure,
  withHandlers({
    handlePress: ({ tvshowId, tvshow, navigate }: Props) => () => {
      navigate('TvshowDetailsPage', {
        tvshowId,
        tvshowName: tvshow.name,
      });
    },
  }),
);

function TvshowItem({ tvshow, seasonsCount, viewers, handlePress }: Props) {
  return (
    <ListItem avatar onPress={handlePress}>
      <Left>
        {tvshow.poster &&
          <Thumbnail square source={{ uri: tvshow.poster }} style={styles.poster} />}
        {!tvshow.poster &&
          <Button transparent style={{ width: 57 }} /> /* FIXME: too tricky */}
      </Left>
      <Body style={styles.infos}>
        <Text style={styles.name}>
          {tvshow.name}
        </Text>
        <Text style={styles.seasonsCount}>
          / {seasonsCount}
        </Text>
        <View style={styles.viewers}>
          {viewers.length
            ? viewers.map(viewer =>
              (<Text note numberOfLines={1} key={viewer.name} style={styles.viewer}>
                {viewer.name}:{viewer.seasonsViewed}&nbsp;
              </Text>),
              )
            : <Text>&nbsp;</Text>}
        </View>
      </Body>
    </ListItem>
  );
}

export default enhance(TvshowItem);
