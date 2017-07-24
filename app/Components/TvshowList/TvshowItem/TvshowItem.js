/* @flow */
import { Badge, Body, Button, Left, ListItem, Text, Thumbnail, View } from 'native-base';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

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
    handlePress: ({ tvshowId, navigate }: Props) => () => {
      navigate('TvshowDetailsPage', { tvshowId });
    },
  }),
);

const renderViewer = (viewer: ViewerInfo, seasonsCount: number) => {
  const whenNotCompleted =
    viewer.seasonsViewed < seasonsCount ? styles.viewerNotCompleted : {};
  return (
    <Text note numberOfLines={1} key={viewer.name} style={styles.viewer}>
      {viewer.name}{' '}
      <Text note style={whenNotCompleted}>
        {viewer.seasonsViewed}
      </Text>&nbsp;&nbsp;
    </Text>
  );
};
function TvshowItem({ tvshow, seasonsCount, viewers, handlePress }: Props) {
  return (
    <ListItem avatar onPress={handlePress}>
      <Left>
        {tvshow.poster &&
          <Thumbnail square source={{ uri: tvshow.poster }} style={styles.poster} />}
        {!tvshow.poster &&
          <Button disabled transparent style={{ width: 57 }} /> /* FIXME: too tricky */}
      </Left>
      <Body style={styles.infos}>
        <Text style={styles.name}>
          {tvshow.name}
        </Text>
        <Badge style={styles.seasonsCount}>
          <Text>
            {seasonsCount}
          </Text>
        </Badge>
        <View style={styles.viewers}>
          {viewers.length
            ? viewers.map(viewer => renderViewer(viewer, seasonsCount))
            : <Text>&nbsp;</Text>}
        </View>
      </Body>
    </ListItem>
  );
}

export default enhance(TvshowItem);
