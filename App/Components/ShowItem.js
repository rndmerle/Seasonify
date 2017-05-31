import React from 'react';
import { ListItem, Text } from 'native-base';

const ShowItem = ({ showId, showName, navigate }) => {
  const onPressShow = () => {
    navigate('ShowDetails', {
      showId,
      showName,
    });
  };
  return (
    <ListItem onPress={onPressShow}>
      <Text>{showName}</Text>
    </ListItem>
  );
};

export default ShowItem;
