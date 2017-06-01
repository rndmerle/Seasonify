import React from 'react';
import { connect } from 'react-redux';
import { Container, Content, Grid, Col } from 'native-base';

import { tvshowActions, tvshowSelectors } from '../Redux/tvshowRedux';
import { editActions, editSelectors } from '../Redux/editRedux';
import TvshowDetailsHeader from './TvshowDetailsHeader';
import SingleFAB from '../Components/SingleFAB';
import Poster from '../Components/Poster';
import TvshowSheet from '../Components/TvshowSheet';
import SeasonList from '../Components/SeasonList';

const mapStateToProps = state => ({
  getTvshows: tvshowSelectors.getTvshows(state),
  isEditing: editSelectors.isEditing(state),
  editedObject: editSelectors.editedObject(state),
});

const mapActionsToProps = {
  updateEdit: editActions.updateEdit,
  seasonsRefresh: tvshowActions.seasonsRefresh,
};

function TvshowDetails({
  navigation,
  getTvshows,
  isEditing,
  editedObject,
  updateEdit,
  seasonsRefresh,
}) {
  const { tvshowId, tvshowAllocine } = navigation.state.params;
  const tvshow = getTvshows[tvshowId];

  const onChangeName = name => {
    updateEdit({ id: tvshowId, name });
  };

  const onFAB = () => {
    seasonsRefresh(tvshowId, tvshowAllocine);
  };

  if (tvshow) {
    return (
      <Container>
        <Content>
          <Grid>
            <Col size={38}>
              <Poster url={tvshow.poster} />
            </Col>
            <Col size={62}>
              <TvshowSheet
                name={tvshow.name}
                frenchName={tvshow.frenchName}
                year={tvshow.year}
                seasonCount={tvshow.seasonCount}
                edit={editedObject}
                isEditing={isEditing}
                onChangeName={onChangeName}
              />
            </Col>
          </Grid>
          <SeasonList
            tvshowId={tvshow.id}
            tvshowAllocine={tvshow.allocine}
            seasons={tvshow.seasons}
          />
        </Content>
        <SingleFAB icon="refresh" onPress={onFAB} />
      </Container>
    );
  }
  return <Container />;
}

TvshowDetails.navigationOptions = ({ navigation }) => ({
  header: (
    <TvshowDetailsHeader
      tvshowName={navigation.state.params.tvshowName}
      tvshowId={navigation.state.params.tvshowId}
      navigate={navigation.navigate}
    />
  ),
});

export default connect(mapStateToProps, mapActionsToProps)(TvshowDetails);
