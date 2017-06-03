import React from 'react';
import {
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Icon,
  Button,
} from 'native-base';

export default function SuggestionItem({
  suggestionKey,
  onPress,
  poster,
  title,
  subtitle,
}) {
  const onPressSuggestion = () => {
    onPress(suggestionKey);
  };
  return (
    <ListItem onPress={onPressSuggestion} avatar>
      <Left>
        {poster && <Thumbnail square source={{ uri: poster }} />}
        {!poster &&
          <Button transparent style={{ width: 57 }} /> /* FIXME: too tricky */}
      </Left>
      <Body>
        <Text>{title}</Text>
        <Text note>{subtitle}</Text>
      </Body>
      <Right>
        <Icon name="add-circle" />
      </Right>
    </ListItem>
  );
}
