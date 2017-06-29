/* @flow */
import {
  View,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Icon,
  Button,
} from 'native-base';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

type Props = {
  /* parent */
  suggestionKey: number,
  onPress: Function,
  poster?: string,
  title: string,
  subtitle?: string,
  alreadyAdded?: boolean,
  /* connect */
  /* state */
  /* handlers */
  handlePressSuggestion: Function,
};

const enhance = compose(
  pure,
  withHandlers({
    handlePressSuggestion: ({ alreadyAdded, suggestionKey, onPress }: Props) => () => {
      if (!alreadyAdded) onPress(suggestionKey);
    },
  }),
);

function SuggestionItem({
  poster,
  title,
  subtitle,
  alreadyAdded = false,
  handlePressSuggestion,
}: Props) {
  return (
    <View>
      <ListItem onPress={handlePressSuggestion} avatar>
        <Left>
          {poster && <Thumbnail square source={{ uri: poster }} />}
          {!poster &&
            <Button transparent style={{ width: 57 }} /> /* FIXME: too tricky */}
        </Left>
        <Body>
          <Text>{title}</Text>
          <Text note>{subtitle}</Text>
        </Body>
        {!alreadyAdded &&
          <Right>
            <Icon name="add-circle" />
          </Right>}
      </ListItem>
    </View>
  );
}

export default enhance(SuggestionItem);
