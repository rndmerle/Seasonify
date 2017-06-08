import React from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import { Container, Content, Form, Label, Input, Item } from 'native-base';

import friendRedux from '../Redux/friendRedux';
import HeaderModular from '../Components/HeaderModular';
import Ident from '../Libs/Ident';

const mapStateToProps = null; // state => ({});

const mapActionsToProps = {
  friendAdd: friendRedux.actions.friendAdd,
};

export class FriendAdd extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <HeaderModular
        title="New friend"
        cancelButton={{ icon: 'close', action: navigation.goBack }}
        actionButtons={[{ text: 'ADD', action: navigation.state.params.handleSave }]}
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
    if (this.state && this.state.friendName && this.state.friendName.trim() !== '') {
      this.props.friendAdd(Ident.newid(), this.state.friendName.trim());
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
