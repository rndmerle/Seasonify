/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import { Container, Content, Form, Label, Input, Item } from 'native-base';

import friendState from 'State/friendState';
import HeaderModular from 'Components/HeaderModular';
import Identity from 'Libs/Identity';

const mapStateToProps = null; // state => ({});

const mapActionsToProps = {
  friendAdd: friendState.actions.friendAdd,
};

type Props = {
  navigation: Object,
  friendAdd: Function,
};

type State = {
  friendName: string,
};

export class FriendAdd extends React.Component<void, Props, State> {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <HeaderModular
        title="New friend"
        cancelButton={{ icon: 'close', action: navigation.goBack }}
        actionButtons={[
          {
            text: 'ADD',
            action: navigation.state.params && navigation.state.params.handleSave,
          },
        ]}
      />
    ),
  });

  state = {
    friendName: '',
  };

  componentWillMount() {
    this.props.navigation.setParams({
      handleSave: this.handleSave,
    });
  }

  onChangeName = (name: string) => {
    this.setState({ friendName: name });
  };

  handleSave = () => {
    if (this.state.friendName.trim() !== '') {
      this.props.friendAdd(Identity.newid(), this.state.friendName.trim());
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
              <Input onChangeText={this.onChangeName} autoFocus autoCapitalize="words" />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(FriendAdd);
