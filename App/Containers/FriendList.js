import React from 'react';
import { Container, Content, List } from 'native-base';
import { connect } from 'react-redux';

import { friendActions, friendSelectors } from 'app/Redux/friendRedux';
import HeaderRoot from 'app/Components/HeaderRoot';
import FriendItem from 'app/Components/FriendItem';
import SingleFAB from 'app/Components/SingleFAB';

const mapStateToProps = state => ({
  friends: friendSelectors.getFriends(state),
});

const mapActionsToProps = {};

export function FriendList({ navigation, friends }) {
  const onFAB = () => {
    navigation.navigate('FriendAdd', {});
  };
  return (
    <Container>
      <Content>
        <List>
          {Object.keys(friends).map(id => (
            <FriendItem
              key={id}
              friend={friends[id]}
              navigate={navigation.navigate}
            />
          ))}
        </List>
      </Content>
      <SingleFAB icon="add" onPress={onFAB} />
    </Container>
  );
}

FriendList.navigationOptions = ({ navigation }) => ({
  header: <HeaderRoot title="Friends" navigation={navigation} />,
});

const Connected = connect(mapStateToProps, mapActionsToProps)(FriendList);
export default Connected;
