import React from 'react';
import { ListItem, Text } from 'native-base';

export default function FriendItem({ friend, navigate }) {
  const onPressFriend = () => {
    navigate('FriendDetailsPage', {
      friend,
    });
  };
  return (
    <ListItem onPress={onPressFriend}>
      <Text>{friend.name}</Text>
    </ListItem>
  );
}
