import React from 'react';
import { ListItem, Text } from 'native-base';

const TvshowItem = ({ tvshowId, tvshowName, navigate }) => {
  const onPressTvshow = () => {
    navigate('TvshowDetails', {
      tvshowId,
      tvshowName,
    });
  };
  return (
    <ListItem onPress={onPressTvshow}>
      <Text>{tvshowName}</Text>
    </ListItem>
  );
};

export default TvshowItem;
