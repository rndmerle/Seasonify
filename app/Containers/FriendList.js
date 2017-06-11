import { Container, Content, List } from 'native-base';
import { connect } from 'react-redux';
import React from 'react';

import FriendItem from 'Components/FriendItem';
import HeaderRoot from 'Components/HeaderRoot';
import SingleFAB from 'Components/SingleFAB';
import friendState from 'State/friendState';

const mapStateToProps = state => ({
  friends: friendState.selectors.getFriends(state),
});

const mapActionsToProps = {};

export function FriendList({ navigation, friends }) {
  const onFAB = () => {
    navigation.navigate('FriendAddPage', {});
  };
  return (
    <Container>
      <Content>
        <List>
          {Object.keys(friends).map(id =>
            <FriendItem key={id} friend={friends[id]} navigate={navigation.navigate} />,
          )}
        </List>
      </Content>
      <SingleFAB icon="add" onPress={onFAB} />
    </Container>
  );
}

FriendList.navigationOptions = ({ navigation }) => ({
  header: <HeaderRoot title="Friends" navigation={navigation} />,
});

export default connect(mapStateToProps, mapActionsToProps)(FriendList);
