import React from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import { Container, Content, Form, Label, Input, Item } from 'native-base';

import { friendActions } from 'app/Redux/friendRedux';
import HeaderModular from 'app/Components/HeaderModular';

const mapStateToProps = null; // state => ({});

const mapActionsToProps = {
  addFriend: friendActions.addFriend,
};

class FriendAdd extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <HeaderModular
        title="New friend"
        cancelButton={{ icon: 'close', action: navigation.goBack }}
        actionButtons={[
          { text: 'ADD', action: navigation.state.params.handleSave },
        ]}
      />
    ),
  });

  componentWillMount() {
    this.props.navigation.setParams({
      handleSave: this.handleSave,
    });
  }

  onChangeName = name => {
    this.setState({ friendName: name });
  };

  handleSave = () => {
    if (
      this.state &&
      this.state.friendName &&
      this.state.friendName.trim() !== ''
    ) {
      this.props.addFriend(this.state.friendName.trim());
      this.props.navigation.goBack();
      Keyboard.dismiss();
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Friend&rsquo;s name</Label>
              <Input
                onChangeText={this.onChangeName}
                autoFocus
                autoCapitalize="words"
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(FriendAdd);
