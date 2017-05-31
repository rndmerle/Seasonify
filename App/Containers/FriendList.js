import React from 'react';
import { Container, Content, List } from 'native-base';
import { connect } from 'react-redux';

import { friendActions, friendSelectors } from '../Redux/FriendRedux';
import HeaderRoot from '../Components/HeaderRoot';
import FriendItem from '../Components/FriendItem';
import SingleFAB from '../Components/SingleFAB';

// import styles from './Styles/FriendList.style';

const mapStateToProps = state => ({
  friends: friendSelectors.getFriends(state),
});

const mapActionsToProps = {};

export class FriendList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: <HeaderRoot title="Friends" navigation={navigation} />,
  });

  onFAB = () => {
    this.props.navigation.navigate('FriendAdd', {});
  };

  render() {
    const { navigation, friends } = this.props;

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
        <SingleFAB onPress={this.onFAB} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(FriendList);
