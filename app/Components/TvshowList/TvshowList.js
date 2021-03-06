/* @flow */
import { Container, Content } from 'native-base';
import { /* FlatList,*/ VirtualizedList } from 'react-native';
import { branch, compose, pure, renderComponent, withHandlers } from 'recompose';
import React from 'react';

import { atomicStyles } from 'Themes';
import Helptext from 'Components/Helptext';
import Loading from 'Components/Loading';
import SingleFAB from 'Components/SingleFAB';

import TvshowItem from './TvshowItem';

type Props = {
  /* parent */
  navigation: Object,
  /* connect */
  tvshowsIds: string[],
  isLoading: LoadingValue,
  /* HOC */
  handleFAB: Function,
};

const enhance = compose(
  withHandlers({
    handleFAB: ({ navigation }: Props) => () => {
      navigation.navigate('TvshowAddPage');
    },
  }),
  pure,
  branch(({ isLoading }: Props) => isLoading, renderComponent(Loading)),
);

function TvshowList({ navigation, tvshowsIds, handleFAB }: Props) {
  /* istanbul ignore next */
  const renderItem = ({ item: id }) =>
    <TvshowItem tvshowId={id} navigate={navigation.navigate} />;

  const getItem = (data, index) => data[index];
  const keyExtractor = item => item;

  return (
    <Container style={atomicStyles.marginTop}>
      {!tvshowsIds.length
        ? <Helptext fullscreen>
            You can add a TV show{'\n'}using the button below
          </Helptext>
        : <Content>
          <VirtualizedList
            initialNumberToRender={11}
            data={tvshowsIds}
            getItemCount={/* istanbul ignore next */ data => data.length}
            getItem={getItem}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            />
        </Content>}

      <SingleFAB icon="add" onPress={handleFAB} />
    </Container>
  );
}

export default enhance(TvshowList);
