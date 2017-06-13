import { Col, Container, Content, Grid, View } from 'native-base';
import { connect } from 'react-redux';
import React from 'react';

import { Metrics } from 'Themes';
import Poster from 'Components/Poster';
import SeasonList from 'Components/SeasonList';
import SingleFAB from 'Components/SingleFAB';
import TvshowSheet from 'Components/TvshowSheet';
import editState from 'State/editState';
import tv from 'State/tvshowState';

import Loading from './Loading';
import TvshowDetailsHeader from './TvshowDetailsHeader';

const mapStateToProps = (state, ownProps) => ({
  getTvshow: tv.selectors.getTvshow(state, ownProps.navigation.state.params.tvshowId),
  isEditing: editState.selectors.isEditing(state),
  editedObject: editState.selectors.editedObject(state),
});

const mapActionsToProps = {
  editUpdate: editState.actions.editUpdate,
  seasonsRefresh: tv.actions.seasonsRefresh,
};

export function TvshowDetails({
  navigation,
  getTvshow,
  isEditing,
  editedObject,
  editUpdate,
  seasonsRefresh,
}) {
  const { tvshowId } = navigation.state.params;
  const tvshow = getTvshow;

  const onChangeName = name => {
    editUpdate({ id: tvshowId, name });
  };

  const onFAB = () => {
    seasonsRefresh(tvshow.id);
  };

  if (tvshow) {
    return (
      <Container>
        <Content>
          <Grid>
            <Col size={Metrics.columnLeft}>
              <Poster url={tvshow.poster} />
            </Col>
            <Col size={Metrics.columnRight}>
              <TvshowSheet
                name={tvshow.name}
                localizedName={tvshow.localizedName}
                year={tvshow.year}
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
        <Loading color="lightblue" />
      </Container>
    );
  }
  return <Container />;
}

TvshowDetails.navigationOptions = ({ navigation }) => ({
  header: (
    <TvshowDetailsHeader
      tvshowId={navigation.state.params.tvshowId}
      navigate={navigation.navigate}
    />
  ),
});

export default connect(mapStateToProps, mapActionsToProps)(TvshowDetails);
