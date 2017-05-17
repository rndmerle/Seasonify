import React from 'react';
import { ListItem, Text } from 'native-base';

const ShowItem = ({ show, navigate }) => {
  const onPressShow = () => {
    navigate('ShowDetails', {
      show,
    });
  };
  return (
    <ListItem onPress={onPressShow}>
      <Text>{show.name}</Text>
    </ListItem>
  );
};

export default ShowItem;
