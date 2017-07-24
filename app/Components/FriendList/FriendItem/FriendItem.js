/* @flow */
import { Body, Button, Left, ListItem, Text } from 'native-base';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

type Props = {
  /* parent */
  navigate: Function,
  friend: Friend,
  /* connect */
  /* HOC */
  handlePress: Function,
};

const enhance = compose(
  withHandlers({
    handlePress: ({ navigate, friend }: Props) => () => {
      navigate('FriendDetailsPage', { friendId: friend.id });
    },
  }),
  pure,
);

function FriendItem({ friend, handlePress }: Props) {
  return (
    <ListItem icon onPress={handlePress}>
      <Left>
        <Button small disabled style={{ backgroundColor: friend.color }} />
      </Left>
      <Body>
        <Text>
          {friend.name}
        </Text>
      </Body>
    </ListItem>
  );
}

export default enhance(FriendItem);
