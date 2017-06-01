import React from 'react';
import { connect } from 'react-redux';
import { Container, Content, Grid, Col } from 'native-base';

import { showActions, showSelectors } from '../Redux/showRedux';
import { editActions, editSelectors } from '../Redux/editRedux';
import ShowDetailsHeader from './ShowDetailsHeader';
import Poster from '../Components/Poster';
import ShowSheet from '../Components/ShowSheet';
import SeasonList from '../Components/SeasonList';

const mapStateToProps = state => ({
  getShows: showSelectors.getShows(state),
  isEditing: editSelectors.isEditing(state),
  editedObject: editSelectors.editedObject(state),
});

const mapActionsToProps = {
  updateEdit: editActions.updateEdit,
  seasonsRefresh: showActions.seasonsRefresh,
};

export class _ShowDetails extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <ShowDetailsHeader
        showName={navigation.state.params.showName}
        showId={navigation.state.params.showId}
        navigate={navigation.navigate}
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
    const show = this.props.getShows[this.state.showId];
    if (show) {
      return (
        <Container>
          <Content>
            <Grid>
              <Col size={38}>
                <Poster url={show.poster} />
              </Col>
              <Col size={62}>
                <ShowSheet
                  name={show.name}
                  frenchName={show.frenchName}
                  year={show.year}
                  seasonCount={show.seasonCount}
                  edit={this.props.editedObject}
                  isEditing={this.props.isEditing}
                  onChangeName={this.onChangeName}
                />
              </Col>
            </Grid>
            <SeasonList
              showId={show.id}
              showAllocine={show.allocine}
              seasons={show.seasons}
              seasonsRefresh={this.props.seasonsRefresh}
            />
          </Content>
        </Container>
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapActionsToProps)(_ShowDetails);
