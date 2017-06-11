import React from 'react';
import { ListItem, Text } from 'native-base';

export default function TvshowItem({ tvshowId, tvshowName, navigate }) {
  const onPressTvshow = () => {
    navigate('TvshowDetailsPage', {
      tvshowId,
      tvshowName,
    });
  };

  return (
    <ListItem onPress={onPressTvshow}>
      <Text>{tvshowName}</Text>
    </ListItem>
  );
}
