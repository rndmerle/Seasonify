import { Container, Content, List } from 'native-base';
import { connect } from 'react-redux';
import React from 'react';

import { tvshowSelectors } from '../Redux/tvshowRedux';
import HeaderRoot from '../Components/HeaderRoot';
import SingleFAB from '../Components/SingleFAB';
import TvshowItem from '../Components/TvshowItem';

const mapStateToProps = state => ({
  tvshows: tvshowSelectors.getTvshows(state),
});

const mapActionsToProps = {};

export function TvshowList({ navigation, tvshows }) {
  const onFAB = () => {
    navigation.navigate('TvshowAdd');
  };

  return (
    <Container>
      <Content>
        <List>
          {Object.keys(tvshows).map(id => (
            <TvshowItem
              key={id}
              tvshowId={id}
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
  header: <HeaderRoot title="TV Shows" navigation={navigation} />,
});

export default connect(mapStateToProps, mapActionsToProps)(TvshowList);
