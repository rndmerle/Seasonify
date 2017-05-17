import React from 'react';
import { ListItem, Text } from 'native-base';

const FriendItem = ({ friend, navigate }) => {
  const onPressFriend = () => {
    navigate('FriendDetails', {
      friend,
    });
  };
  return (
    <ListItem onPress={onPressFriend}>
      <Text>{friend.name}</Text>
    </ListItem>
  );
};

export default FriendItem;
