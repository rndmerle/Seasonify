import React from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import { Container, Content, Form, Label, Item, Input, Icon } from 'native-base';

import { friendActions } from '../Redux/FriendRedux';
import HeaderModular from '../Components/HeaderModular';
import DefaultMessage from '../Config/DefaultMessage';
import { trimmed } from '../Services/Helpers';

@connect(
  () => ({}),
  friendActions,
)
export default class FriendDetails extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return ({
      header: <HeaderModular
        title={params.friend.name}
        cancelButton={{ icon: 'arrow-back', action: navigation.goBack }}
        actionButtons={[
          {
            visibleIf: !params.isEditing,
            icon: 'create',
            action: params.handleEdit,
          },
          {
            svisibleIf: params.isEditing,
            hideByDefault: true,
            icon: 'checkmark',
            action: params.handleUpdate,
          },
          { icon: 'trash', action: params.handleDelete },
        ]}
      />,
    });
  }

  componentWillMount() {
    this.props.navigation.setParams({
      isEditing: false,
      handleEdit: this.handleEdit,
      handleUpdate: this.handleUpdate,
      handleDelete: this.handleDelete,
    });
  }

  onChangeName = (name) => {
    this.props.navigation.setParams({
      friend: { ...this.props.navigation.state.params.friend, name },
    });
  };

  handleEdit = () => {
    this.props.navigation.setParams({
      isEditing: true,
    });
  };

  handleUpdate = () => {
    const { friend } = this.props.navigation.state.params;
    this.props.updateFriend(trimmed(friend));
    Keyboard.dismiss();
    this.props.navigation.navigate('FriendList',
      { message: {
        ...DefaultMessage,
        text: `${friend.name} has been edited`,
      } },
    );
  };

  handleDelete = () => {
    const { friend } = this.props.navigation.state.params;
    this.props.removeFriend(friend.id);
    this.props.navigation.navigate('FriendList',
      { message: {
        ...DefaultMessage,
        text: `${friend.name} has been deleted`,
        type: 'warning',
      } },
    );
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
