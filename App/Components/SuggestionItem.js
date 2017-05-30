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

const SuggestionItem = ({
  suggestionKey,
  onPress,
  posterURL,
  title,
  subtitle,
}) => {
  const onPressSuggestion = () => {
    onPress(suggestionKey);
  };
  return (
    <ListItem onPress={onPressSuggestion} avatar>
      <Left>
        {posterURL && <Thumbnail square source={{ uri: posterURL }} />}
        {!posterURL &&
          <Button transparent style={{ width: 57 }} /> /* FIXME: too tricky */}
      </Left>
      <Body>
        <Text>{title}</Text>
        <Text note>{subtitle}</Text>
      </Body>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  );
};

export default SuggestionItem;
