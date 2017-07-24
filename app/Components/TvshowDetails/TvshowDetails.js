/* @flow */
import { Col, Container, Content, Grid } from 'native-base';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

import { Metrics } from 'Themes';
import Loading from 'Components/Loading';
import Poster from 'Components/Poster';
import SingleFAB from 'Components/SingleFAB';

import SeasonList from './SeasonList';
import TvshowSheet from './TvshowSheet';

type Props = {
  /* parent */
  navigation: Object,
  /* connect */
  tvshow: Tvshow,
  isEditing: boolean,
  editedObject: Object,
  editUpdate: Function,
  seasonsRefresh: Function,
  isSpinning: boolean,
  /* HOC */
  handleChangeName: Function,
  handleFAB: Function,
};

const enhance = compose(
  pure,
  withHandlers({
    handleChangeName: ({ navigation, editUpdate }: Props) => (name: string) => {
      editUpdate({ id: navigation.state.params.tvshowId, name });
    },
    handleFAB: ({ tvshow, seasonsRefresh }: Props) => () => {
      seasonsRefresh(tvshow.id);
    },
  }),
);

function TvshowDetails({
  navigation,
  tvshow,
  isEditing,
  editedObject,
  isSpinning,
  handleChangeName,
  handleFAB,
}: Props) {
  if (tvshow) {
    return (
      <Container>
        <Content>
          <Grid>
            <Col size={Metrics.columnLeft}>
              {tvshow.poster && <Poster url={tvshow.poster} />}
            </Col>
            <Col size={Metrics.columnRight}>
              <TvshowSheet
                name={tvshow.name}
                localizedName={tvshow.localizedName}
                year={tvshow.year}
                edit={editedObject}
                isEditing={isEditing}
                onChangeName={handleChangeName}
              />
            </Col>
          </Grid>
          <SeasonList
            tvshowId={tvshow.id}
            seasons={tvshow.seasons}
            navigation={navigation}
          />
        </Content>
        <SingleFAB icon="refresh" onPress={handleFAB} />
        <Loading position="nextToFAB" isSpinning={isSpinning} />
      </Container>
    );
  }
  return <Container />;
}

export default enhance(TvshowDetails);
