import React from 'react';
import { connect } from 'react-redux';
import { Container, Content, Grid, Col } from 'native-base';

import { showActions, showSelectors } from '../Redux/showRedux';
import { editActions, editSelectors } from '../Redux/editRedux';
import ShowDetailsHeader from './ShowDetailsHeader';
import SingleFAB from '../Components/SingleFAB';
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

function ShowDetails({
  navigation,
  getShows,
  isEditing,
  editedObject,
  updateEdit,
  seasonsRefresh,
}) {
  const { showId, showAllocine } = navigation.state.params;
  const show = getShows[showId];

  const onChangeName = name => {
    updateEdit({ id: showId, name });
  };

  const onFAB = () => {
    seasonsRefresh(showId, showAllocine);
  };

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
                edit={editedObject}
                isEditing={isEditing}
                onChangeName={onChangeName}
              />
            </Col>
          </Grid>
          <SeasonList
            showId={show.id}
            showAllocine={show.allocine}
            seasons={show.seasons}
          />
        </Content>
        <SingleFAB icon="refresh" onPress={onFAB} />
      </Container>
    );
  }
  return null;
}

ShowDetails.navigationOptions = ({ navigation }) => ({
  header: (
    <ShowDetailsHeader
      showName={navigation.state.params.showName}
      showId={navigation.state.params.showId}
      navigate={navigation.navigate}
    />
  ),
});

export default connect(mapStateToProps, mapActionsToProps)(ShowDetails);
