import React from 'react';
import { connect } from 'react-redux';
import { Container, Content, Grid, Col } from 'native-base';

import { Metrics } from '../Themes';
import { tvshowActions, tvshowSelectors } from '../Redux/tvshowRedux';
import { editActions, editSelectors } from '../Redux/editRedux';
import SingleFAB from '../Components/SingleFAB';
import Poster from '../Components/Poster';
import TvshowSheet from '../Components/TvshowSheet';
import SeasonList from '../Components/SeasonList';
import TvshowDetailsHeader from './TvshowDetailsHeader';
import Loading from './Loading';

const mapStateToProps = (state, ownProps) => ({
  getTvshow: tvshowSelectors.getTvshow(
    state,
    ownProps.navigation.state.params.tvshowId,
  ),
  isEditing: editSelectors.isEditing(state),
  editedObject: editSelectors.editedObject(state),
});

const mapActionsToProps = {
  updateEdit: editActions.updateEdit,
  seasonsRefresh: tvshowActions.seasonsRefresh,
};

export function TvshowDetails({
  navigation,
  getTvshow,
  isEditing,
  editedObject,
  updateEdit,
  seasonsRefresh,
}) {
  const { tvshowId } = navigation.state.params;
  const tvshow = getTvshow;

  const onChangeName = name => {
    updateEdit({ id: tvshowId, name });
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
