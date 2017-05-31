import React from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

import { showActions, showSelectors } from '../Redux/showRedux';
import { uiActions } from '../Redux/uiRedux';
import { editActions, editSelectors } from '../Redux/editRedux';
import ShowDetailsHeader from './ShowDetailsHeader';
import ShowSheet from '../Components/ShowSheet';

const mapStateToProps = state => ({
  getShows: showSelectors.getShows(state),
  isEditing: editSelectors.isEditing(state),
  editedObject: editSelectors.editedObject(state),
});

const mapActionsToProps = {
  removeShow: showActions.removeShow,
  updateShow: showActions.updateShow,
  toastMessage: uiActions.toastMessage,
  startEdit: editActions.startEdit,
  endEdit: editActions.endEdit,
  updateEdit: editActions.updateEdit,
};

export class _ShowDetails extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <ShowDetailsHeader
        showName={navigation.state.params.showName}
        showId={navigation.state.params.showId}
        goBack={navigation.goBack}
      />
    ),
  });

  componentWillMount() {
    this.setState({ showId: this.props.navigation.state.params.showId });
  }

  onChangeName = name => {
    this.props.updateEdit({ id: this.state.showId, name });
  };

  render() {
    return (
      <Container>
        <Content>
          <ShowSheet
            show={this.props.getShows[this.state.showId]}
            edit={this.props.editedObject}
            isEditing={this.props.isEditing}
            onChangeName={this.onChangeName}
          />
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(_ShowDetails);
