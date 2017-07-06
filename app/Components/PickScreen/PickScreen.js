/* @flow */
import { Container, Content, ListItem, Radio, Right, Text } from 'native-base';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

type Props = {
  /* parent */
  navigation: {
    state: Object,
    goBack: Function,
    title: string,
    isMultiSelection?: boolean,
    collection: Array<Object> | Object, // Can be either an object or an array of {id, name}
    onSelect: Function,
  },
  /* connect */
  /* state */
  /* handlers */
  handleItemSelect: Function,
};

const enhance = compose(
  pure,
  withHandlers({
    handleItemSelect: ({ navigation }: Props) => itemId => {
      const { isMultiSelection, onSelect } = navigation.state.params;
      onSelect(itemId);
      if (!isMultiSelection) navigation.goBack();
    },
  }),
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
