import { Body, ListItem, Text } from 'native-base';
import React from 'react';

export default function TvshowItem({
  tvshowId,
  tvshowName,
  navigate,
}: {
  tvshowId: string,
  tvshowName: string,
  navigate: Function,
}) {
  const onPressTvshow = () => {
    navigate('TvshowDetailsPage', {
      tvshowId,
      tvshowName,
    });
  };

  return (
    <ListItem onPress={onPressTvshow}>
      <Body>
        <Text>{tvshowName}</Text>
      </Body>
    </ListItem>
  );
}
