/* @flow */
import { Container, Content, Form, Label, Item, Input, Icon } from 'native-base';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';

import type { Friend } from 'Types';
import HeaderModular from 'Components/HeaderModular';
import friendState from 'State/friendState';
import ui from 'State/uiState';

const mapStateToProps = null; // state => ({});

const mapActionsToProps = {
  friendRemove: friendState.actions.friendRemove,
  friendUpdate: friendState.actions.friendUpdate,
  messageToast: ui.actions.messageToast,
};

type Props = {
  navigation: Object,
  friendRemove: Function,
  friendUpdate: Function,
  messageToast: Function,
};

type State = {
  friend: Friend,
};

export class FriendDetails extends React.Component<void, Props, State> {
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

  state = {
    // local model
    friend: this.props.navigation.state.params.friend,
  };

  componentWillMount() {
    // actions and params for the navigation state
    this.props.navigation.setParams({
      isEditing: false,
      handleEdit: this.handleEdit,
      handleDone: this.handleDone,
      handleDelete: this.handleDelete,
    });
  }

  onChangeName = (name: string) => {
    this.syncModel({ name });
  };

  syncModel = ({ name }: { name: string }, callback: Function = () => {}) => {
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
    this.props.friendUpdate(this.state.friend);
    this.props.navigation.navigate('FriendListPage', {});
    this.props.messageToast('success', `${this.state.friend.name} has been edited`);
  };

  handleDelete = () => {
    const { friend } = this.props.navigation.state.params;
    this.props.friendRemove(friend.id);
    this.props.navigation.navigate('FriendListPage', {});
    this.props.messageToast('warning', `${friend.name} has been deleted`);
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
