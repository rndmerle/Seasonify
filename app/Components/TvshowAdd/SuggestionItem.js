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
import { Keyboard } from 'react-native';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

type Props = {
  /* parent */
  navigation: Object,
  suggestionKey: number,
  alreadyAddedId?: string,
  onPress: Function,
  poster?: string,
  title: string,
  subtitle?: string,
  /* connect */
  /* HOC */
  handlePressSuggestion: Function,
};

const enhance = compose(
  withHandlers({
    handlePressSuggestion: ({
      navigation,
      suggestionKey,
      alreadyAddedId,
      onPress,
    }: Props) => () => {
      if (alreadyAddedId) {
        Keyboard.dismiss();
        navigation.navigate('TvshowDetailsPage', { tvshowId: alreadyAddedId });
      } else {
        onPress(suggestionKey);
      }
    },
  }),
  pure,
);

function SuggestionItem({
  poster,
  title,
  subtitle,
  alreadyAddedId,
  handlePressSuggestion,
}: Props) {
  return (
    <View>
      <ListItem avatar onPress={handlePressSuggestion}>
        <Left>
          {poster && <Thumbnail square source={{ uri: poster }} />}
          {!poster &&
            <Button transparent disabled style={{ width: 57 }} /> /* FIXME: too tricky */}
        </Left>
        <Body>
          <Text>
            {title}
          </Text>
          <Text note>
            {subtitle}
          </Text>
        </Body>
        {!alreadyAddedId &&
          <Right>
            <Icon name="add-circle" />
          </Right>}
      </ListItem>
    </View>
  );
}

export default enhance(SuggestionItem);
