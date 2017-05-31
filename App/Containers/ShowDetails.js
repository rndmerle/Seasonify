import React from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import { Container, Content } from 'native-base';

import { showActions } from '../Redux/showRedux';
import { uiActions } from '../Redux/uiRedux';
import HeaderModular from '../Components/HeaderModular';
import ShowSheet from '../Components/ShowSheet';

const mapStateToProps = null; // state => ({});

const mapActionsToProps = {
  removeShow: showActions.removeShow,
  updateShow: showActions.updateShow,
  toastMessage: uiActions.toastMessage,
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
    this.props.navigation.navigate('ShowList', {});
    this.props.toastMessage(
      'success',
      `${this.state.show.name} has been edited`,
    );
  };

  handleDelete = () => {
    const { show } = this.props.navigation.state.params;
    this.props.removeShow(show.id);
    this.props.navigation.navigate('ShowList', {});
    this.props.toastMessage('warning', `${show.name} has been deleted`);
  };

  render() {
    const { params } = this.props.navigation.state;

    return (
      <Container>
        <Content>
          <ShowSheet
            show={params.show}
            isEditing={params.isEditing}
            onChangeName={this.onChangeName}
          />
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(ShowDetails);
