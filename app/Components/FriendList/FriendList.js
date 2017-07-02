/* @flow */
import { Container, Content, List } from 'native-base';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

import type { Friends } from 'Types';
import FriendItem from 'Components/FriendItem';
import SingleFAB from 'Components/SingleFAB';

type Props = {
  /* parent */
  navigation: Object,
  /* connect */
  friends: Friends,
  /* HOC */
  handleFAB: Function,
};

const enhance = compose(
  pure,
  withHandlers({
    handleFAB: ({ navigation }: Props) => () => {
      navigation.navigate('FriendAddPage');
    },
  }),
);

function FriendList({ navigation, friends, handleFAB }: Props) {
  return (
    <Container>
      <Content>
        <List>
          {objectValues(friends).map(friend =>
            <FriendItem key={friend.id} friend={friend} navigate={navigation.navigate} />,
          )}
        </List>
      </Content>
      <SingleFAB icon="add" onPress={handleFAB} />
    </Container>
  );
}

export default enhance(FriendList);
