import React from 'react';
import { Container, Content, List } from 'native-base';
import { connect } from 'react-redux';

import { friendActions, friendSelectors } from '../Redux/friendRedux';
import HeaderRoot from '../Components/HeaderRoot';
import FriendItem from '../Components/FriendItem';
import SingleFAB from '../Components/SingleFAB';

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

export default connect(mapStateToProps, mapActionsToProps)(FriendList);
