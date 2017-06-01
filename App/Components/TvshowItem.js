import React from 'react';
import { ListItem, Text } from 'native-base';

const TvshowItem = ({ tvshowId, tvshowName, tvshowAllocine, navigate }) => {
  const onPressTvshow = () => {
    navigate('TvshowDetails', {
      tvshowId,
      tvshowName,
      tvshowAllocine,
    });
  };
  return (
    <ListItem onPress={onPressTvshow}>
      <Text>{tvshowName}</Text>
    </ListItem>
  );
};

export default TvshowItem;
