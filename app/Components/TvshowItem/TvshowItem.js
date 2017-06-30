/* @flow */
import { Body, Button, Left, ListItem, Text, Thumbnail } from 'native-base';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

import styles from './TvshowItem.style';

type Props = {
  /* parent */
  tvshowId: string,
  tvshowName: string,
  poster: ?string,
  seasonsCount: number,
  navigate: Function,
  /* connect */
  /* state */
  /* handlers */
  handlePress: Function,
};

const enhance = compose(
  pure,
  withHandlers({
    handlePress: ({ tvshowId, tvshowName, navigate }: Props) => () => {
      navigate('TvshowDetailsPage', {
        tvshowId,
        tvshowName,
      });
    },
  }),
);

function TvshowItem({ tvshowName, poster, seasonsCount, handlePress }: Props) {
  return (
    <ListItem avatar onPress={handlePress}>
      <Left>
        {poster && <Thumbnail square source={{ uri: poster }} />}
        {!poster && <Button transparent style={{ width: 57 }} /> /* FIXME: too tricky */}
      </Left>
      <Body>
        <Text>
          {tvshowName} <Text style={styles.seasonsCount}>({seasonsCount})</Text>
        </Text>
        <Text note>
          Renaud, Sylvain {/* TODO */}
        </Text>
      </Body>
    </ListItem>
  );
}

export default enhance(TvshowItem);
