import React from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import { Container, Content, Form, Label, Item, Input, Icon } from 'native-base';

import { showActions } from '../Redux/ShowRedux';
import HeaderModular from '../Components/HeaderModular';
import DefaultMessage from '../Config/DefaultMessage';
import { trimmed } from '../Services/Helpers';

@connect(
  () => ({}),
  showActions,
)
export default class ShowDetails extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return ({
      header: <HeaderModular
        title={params.show.name}
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
      show: { ...this.props.navigation.state.params.show, name },
    });
  };

  handleEdit = () => {
    this.props.navigation.setParams({
      isEditing: true,
    });
  };

  handleUpdate = () => {
    const { show } = this.props.navigation.state.params;
    this.props.updateShow(trimmed(show));
    Keyboard.dismiss();
    this.props.navigation.navigate('ShowList',
      { message: {
        ...DefaultMessage,
        text: `${show.name} has been edited`,
      } },
    );
  };

  handleDelete = () => {
    const { show } = this.props.navigation.state.params;
    this.props.removeShow(show.id);
    this.props.navigation.navigate('ShowList',
      { message: {
        ...DefaultMessage,
        text: `${show.name} has been deleted`,
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
                value={params.show.name}
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
