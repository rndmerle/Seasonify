/* @flow */
import { ListItem, Text } from 'native-base';
import React from 'react';

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
