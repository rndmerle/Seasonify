/* @flow */
import {
  Body,
  Button,
  Icon,
  Left,
  ListItem,
  Right,
  Text,
  Thumbnail,
  View,
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
  /* HOC */
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
      <ListItem avatar onPress={handlePressSuggestion}>
        <Left>
          {poster && <Thumbnail square source={{ uri: poster }} />}
          {!poster &&
            <Button transparent style={{ width: 57 }} /> /* FIXME: too tricky */}
        </Left>
        <Body>
          <Text>
            {title}
          </Text>
          <Text note>
            {subtitle}
          </Text>
        </Body>
        {!alreadyAdded &&
          <Right>
            {/* <Button transparent onPress={handlePressSuggestion}> */}
            <Icon name="add-circle" />
            {/* </Button> */}
          </Right>}
      </ListItem>
    </View>
  );
}

export default enhance(SuggestionItem);
