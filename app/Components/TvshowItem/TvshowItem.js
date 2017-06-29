/* @flow */
import { Body, ListItem, Text } from 'native-base';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

type Props = {
  /* parent */
  tvshowId: string,
  tvshowName: string,
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

function TvshowItem({ tvshowName, handlePress }: Props) {
  return (
    <ListItem onPress={handlePress}>
      <Body>
        <Text>{tvshowName}</Text>
      </Body>
    </ListItem>
  );
}

export default enhance(TvshowItem);
