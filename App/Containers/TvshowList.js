import React from 'react';
import { Container, Content, List } from 'native-base';
import { connect } from 'react-redux';

import { tvshowSelectors } from 'app/Redux/tvshowRedux';
import HeaderRoot from 'app/Components/HeaderRoot';
import TvshowItem from 'app/Components/TvshowItem';
import SingleFAB from 'app/Components/SingleFAB';

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

const Connected = connect(mapStateToProps, mapActionsToProps)(TvshowList);
export default Connected;
