/* @flow */
import { Container, Content } from 'native-base';
import { /* FlatList,*/ VirtualizedList } from 'react-native';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

import SingleFAB from 'Components/SingleFAB';
import TvshowItem from 'Components/TvshowItem';

type Props = {
  /* parent */
  navigation: Object,
  /* connect */
  tvshowsIds: string[],
  /* HOC */
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

function TvshowList({ navigation, tvshowsIds, handleFAB }: Props) {
  /* istanbul ignore next */
  const renderItem = ({ item: id }) =>
    <TvshowItem tvshowId={id} navigate={navigation.navigate} />;

  const getItem = (data, index) => data[index];
  const keyExtractor = item => item;

  return (
    <Container>
      <Content>
        <VirtualizedList
          initialNumberToRender={11}
          data={tvshowsIds}
          getItemCount={/* istanbul ignore next */ data => data.length}
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
