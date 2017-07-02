/* @flow */
import { Container, Content } from 'native-base';
import { /* FlatList,*/ VirtualizedList } from 'react-native';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

import type { Tvshows } from 'Types';
import SingleFAB from 'Components/SingleFAB';
import TvshowItem from 'Components/TvshowItem';

type Props = {
  /* parent */
  navigation: Object,
  /* connect */
  tvshows: Tvshows,
  /* state */
  /* handlers */
  handleFAB: Function,
};

const enhance = compose(
  pure,
  withHandlers({
    handleFAB: ({ navigation }: Props) => () => {
      navigation.navigate('TvshowAddPage');
    },
  }),
);

function TvshowList({ navigation, tvshows, handleFAB }: Props) {
  /* istanbul ignore next */
  const renderItem = ({ item: tvshow }) =>
    <TvshowItem key={tvshow.id} tvshowId={tvshow.id} navigate={navigation.navigate} />;

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
      <SingleFAB icon="add" onPress={handleFAB} />
    </Container>
  );
}

export default enhance(TvshowList);
