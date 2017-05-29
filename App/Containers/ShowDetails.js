import React from 'react';
import { connect } from 'react-redux';
import { Keyboard, Image } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Icon,
  List,
  ListItem,
  Text,
  Grid,
  Col,
  Thumbnail,
} from 'native-base';

import { showActions } from '../Redux/ShowRedux';
import HeaderModular from '../Components/HeaderModular';
import { successMessage, warningMessage } from '../Config/DefaultMessages';

const mapStateToProps = null; // state => ({});

const mapActionsToProps = {
  removeShow: showActions.removeShow,
  updateShow: showActions.updateShow,
};

export class ShowDetails extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      header: (
        <HeaderModular
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
    this.setState({ show: this.props.navigation.state.params.show });

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
        show: { ...this.state.show, name: name.trim() },
      },
      callback,
    );
    this.props.navigation.setParams({
      show: { ...this.props.navigation.state.params.show, name },
    });
  };

  handleEdit = () => {
    this.props.navigation.setParams({
      isEditing: true,
    });
  };

  handleDone = () => {
    Keyboard.dismiss();
    this.props.updateShow(this.state.show);
    this.props.navigation.navigate('ShowList', {
      message: {
        ...successMessage,
        text: `${this.state.show.name} has been edited`,
      },
    });
  };

  handleDelete = () => {
    const { show } = this.props.navigation.state.params;
    this.props.removeShow(show.id);
    this.props.navigation.navigate('ShowList', {
      message: {
        ...warningMessage,
        text: `${show.name} has been deleted`,
      },
    });
  };

  render() {
    const { params } = this.props.navigation.state;

    return (
      <Container>
        <Content>
          <Grid>
            <Col size={38}>
              <Image
                resizeMode="contain"
                resizeMethod="scale"
                style={{
                  flex: 1,
                  height: undefined,
                  width: undefined,
                }}
                // style={{ width: 120, height: null }}
                source={{ uri: params.show.posterURL }}
              />
            </Col>
            <Col size={62}>
              <Form>
                <Item regular>
                  {params.isEditing && <Icon name="create" />}
                  <Input
                    disabled={!params.isEditing}
                    placeHolder="Name"
                    value={params.show.name}
                    onChangeText={this.onChangeName}
                    autoCapitalize="words"
                  />
                </Item>
              </Form>
              <List>
                <ListItem>
                  <Text note>{params.show.year}</Text>
                </ListItem>
                <ListItem>
                  <Text note>{params.show.seasonCount} seasons (VO)</Text>
                </ListItem>
              </List>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(ShowDetails);
