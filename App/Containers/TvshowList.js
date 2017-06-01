import React from 'react';
import { Container, Content, List } from 'native-base';
import { connect } from 'react-redux';

import { tvshowSelectors } from '../Redux/tvshowRedux';
import HeaderRoot from '../Components/HeaderRoot';
import TvshowItem from '../Components/TvshowItem';
import SingleFAB from '../Components/SingleFAB';

const mapStateToProps = state => ({
  tvshows: tvshowSelectors.getTvshows(state),
});

const mapActionsToProps = {};

function TvshowList({ navigation, tvshows }) {
  const onFAB = () => {
    navigation.navigate('TvshowAdd', {});
  };

  return (
    <Container>
      <Content>
        <List>
          {Object.keys(tvshows).map(id => (
            <TvshowItem
              key={id}
              tvshowId={id}
              tvshowAllocine={tvshows[id].allocine}
              tvshowName={tvshows[id].name}
              navigate={navigation.navigate}
            />
          ))}
        </List>
      </Content>
      <SingleFAB icon="add" onPress={onFAB} />
    </Container>
  );
}

TvshowList.navigationOptions = ({ navigation }) => ({
  header: <HeaderRoot title="TV Tvshows" navigation={navigation} />,
});

export default connect(mapStateToProps, mapActionsToProps)(TvshowList);
