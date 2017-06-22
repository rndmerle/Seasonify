/* @flow */
import { Container, Content } from 'native-base';
import { /* FlatList,*/ VirtualizedList } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';

import type { Tvshows } from 'Types';
import HeaderRoot from 'Components/HeaderRoot';
import SingleFAB from 'Components/SingleFAB';
import TvshowItem from 'Components/TvshowItem';
import tvshowState from 'State/tvshowState';

const mapStateToProps = state => ({
  tvshows: tvshowState.selectors.getTvshows(state),
});

const mapActionsToProps = {};

export function TvshowList({ navigation, tvshows }: { navigation: Object, tvshows: Tvshows }) {
  const onFAB = () => {
    navigation.navigate('TvshowAddPage');
  };

  /* istanbul ignore next */
  const renderItem = ({ item: tvshow }) =>
    (<TvshowItem
      tvshowId={tvshow.id}
      tvshowName={tvshow.name}
      navigate={navigation.navigate}
    />);

  const keyExtractor = item => item.id;

  const tvshowKeys = Object.keys(tvshows);

  const getItem = (data, index) => data[tvshowKeys[index]];

  return (
    <Container>
      <Content>
        <VirtualizedList
          initialNumberToRender={11}
          data={tvshows}
          extraData={tvshowKeys}
          getItemCount={/* istanbul ignore next */ data => Object.keys(data).length}
          getItem={getItem}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </Content>
      <SingleFAB icon="add" onPress={onFAB} />
    </Container>
  );
}

TvshowList.navigationOptions = ({ navigation }) => ({
  header: <HeaderRoot title="TV Shows" navigation={navigation} />,
});

export default connect(mapStateToProps, mapActionsToProps)(TvshowList);
