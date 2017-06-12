// @flow
import React from 'react';
import { ListItem, Text } from 'native-base';

type Friend = {
  name: string,
};

export default function FriendItem({
  friend,
  navigate,
}: {
  friend: Friend,
  navigate: Function,
}) {
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
