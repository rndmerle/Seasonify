/* @flow */
import { Container, Content, ListItem, Radio, Right, Text } from 'native-base';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

type Props = {
  /* parent */
  navigation: {
    goBack: Function,
    state: {
      params: {
        title: string,
        isMultiSelection?: boolean,
        onSelect: Function,
        // Can be either an object or an array of {id, name}
        collection: Array<Object> | Object,
      },
    },
  },
  /* connect */
  /* HOC */
  handleItemSelect: Function,
};

const enhance = compose(
  withHandlers({
    handleItemSelect: ({ navigation }: Props) => itemId => {
      const { isMultiSelection, onSelect } = navigation.state.params;
      onSelect(itemId);
      /* istanbul ignore else */
      if (!isMultiSelection) navigation.goBack();
    },
  }),
  pure,
);

function PickScreen({ navigation, handleItemSelect }: Props) {
  const { collection } = navigation.state.params;
  let items = [];
  if (typeof items === 'object' && !Array.isArray(collection)) {
    items = Object.keys(collection).map(id => ({
      id: collection[id].id,
      name: collection[id].name,
    }));
  } else {
    items = collection;
  }
  return (
    <Container>
      <Content>
        {items.map(item =>
          (<ListItem key={item.id} onPress={() => handleItemSelect(item.id)}>
            <Text>
              {item.name}
            </Text>
            <Right>
              <Radio selected={false} onPress={() => handleItemSelect(item.id)} />
            </Right>
          </ListItem>),
        )}
      </Content>
    </Container>
  );
}

export default enhance(PickScreen);
