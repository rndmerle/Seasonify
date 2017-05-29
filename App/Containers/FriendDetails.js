import React from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import {
  Container,
  Content,
  Form,
  Label,
  Item,
  Input,
  Icon,
} from 'native-base';

import { friendActions } from '../Redux/FriendRedux';
import HeaderModular from '../Components/HeaderModular';
import { successMessage, warningMessage } from '../Config/DefaultMessages';

const mapStateToProps = null; // state => ({});

const mapActionsToProps = {
  removeFriend: friendActions.removeFriend,
  updateFriend: friendActions.updateFriend,
};

export class FriendDetails extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      header: (
        <HeaderModular
          title={params.friend.name}
          cancelButton={{ icon: 'arrow-back', action: navigation.goBack }}
          actionButtons={[
            {
              visibleIf: !params.isEditing,
              icon: 'create',
              action: params.handleEdit,
            },
            {
              visibleIf: params.isEditing,
              hideByDefault: true,
              icon: 'checkmark',
              action: params.handleDone,
            },
            { icon: 'trash', action: params.handleDelete },
          ]}
        />
      ),
    };
  };

  componentWillMount() {
    // local model
    this.setState({ friend: this.props.navigation.state.params.friend });

    // actions and params for the navigation state
    this.props.navigation.setParams({
      isEditing: false,
      handleEdit: this.handleEdit,
      handleDone: this.handleDone,
      handleDelete: this.handleDelete,
    });
  }

  onChangeName = name => {
    this.syncModel({ name });
  };

  syncModel = ({ name }, callback = () => {}) => {
    this.setState(
      {
        friend: { ...this.state.friend, name: name.trim() },
      },
      callback,
    );
    this.props.navigation.setParams({
      friend: { ...this.props.navigation.state.params.friend, name },
    });
  };

  handleEdit = () => {
    this.props.navigation.setParams({
      isEditing: true,
    });
  };

  handleDone = () => {
    Keyboard.dismiss();
    this.props.updateFriend(this.state.friend);
    this.props.navigation.navigate('FriendList', {
      message: {
        ...successMessage,
        text: `${this.state.friend.name} has been edited`,
      },
    });
  };

  handleDelete = () => {
    const { friend } = this.props.navigation.state.params;
    this.props.removeFriend(friend.id);
    this.props.navigation.navigate('FriendList', {
      message: {
        ...warningMessage,
        text: `${friend.name} has been deleted`,
      },
    });
  };

  render() {
    const { params } = this.props.navigation.state;

    return (
      <Container>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Name</Label>
              {params.isEditing && <Icon name="create" />}
              <Input
                disabled={!params.isEditing}
                value={params.friend.name}
                onChangeText={this.onChangeName}
                autoCapitalize="words"
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(FriendDetails);
