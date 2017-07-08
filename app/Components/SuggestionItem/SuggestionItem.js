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
import { compose, pure, withHandlers, withProps } from 'recompose';
import React from 'react';

type Props = {
  /* parent */
  navigation: Object,
  suggestionKey: number,
  suggestionAllocine: number,
  onPress: Function,
  poster?: string,
  title: string,
  subtitle?: string,
  /* connect */
  codes: { [id: string]: number },
  /* HOC */
  alreadyAdded: boolean,
  handlePressSuggestion: Function,
};

const enhance = compose(
  pure,
  withProps(({ codes, suggestionAllocine }) => ({
    alreadyAdded: !!Object.values(codes).find(code => suggestionAllocine === code),
  })),
  withHandlers({
    handlePressSuggestion: ({
      navigation,
      codes,
      alreadyAdded,
      suggestionKey,
      suggestionAllocine,
      onPress,
    }: Props) => () => {
      if (alreadyAdded) {
        const tvshowId = Object.keys(codes).find(id => codes[id] === suggestionAllocine);
        Keyboard.dismiss();
        navigation.navigate('TvshowDetailsPage', { tvshowId });
      } else {
        onPress(suggestionKey);
      }
    },
  }),
);

function SuggestionItem({
  poster,
  title,
  subtitle,
  alreadyAdded,
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
            <Icon name="add-circle" />
          </Right>}
      </ListItem>
    </View>
  );
}

export default enhance(SuggestionItem);
