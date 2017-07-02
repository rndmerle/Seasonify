/* @flow */
import { Body, Button, Left, ListItem, Text, Thumbnail } from 'native-base';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

import type { Tvshow } from 'Types';

import styles from './TvshowItem.style';

type Props = {
  /* parent */
  tvshowId: string,
  navigate: Function,
  /* connect */
  tvshow: Tvshow,
  seasonsCount: number,
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

function TvshowItem({ tvshow, seasonsCount, handlePress }: Props) {
  return (
    <ListItem avatar onPress={handlePress}>
      <Left>
        {tvshow.poster && <Thumbnail square source={{ uri: tvshow.poster }} />}
        {!tvshow.poster &&
          <Button transparent style={{ width: 57 }} /> /* FIXME: too tricky */}
      </Left>
      <Body>
        <Text>
          {tvshow.name} <Text style={styles.seasonsCount}>({seasonsCount})</Text>
        </Text>
        <Text note>
          Renaud, Sylvain {/* TODO */}
        </Text>
      </Body>
    </ListItem>
  );
}

export default enhance(TvshowItem);
