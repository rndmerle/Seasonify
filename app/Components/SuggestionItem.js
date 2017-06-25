/* @flow */
import { View, ListItem, Left, Body, Right, Thumbnail, Text, Icon, Button } from 'native-base';
import React from 'react';

export default function SuggestionItem({
  suggestionKey,
  onPress,
  poster = '',
  title,
  subtitle = '',
  alreadyAdded = false,
}: {
  suggestionKey: number,
  onPress: Function,
  poster?: string,
  title: string,
  subtitle?: string,
  alreadyAdded?: boolean,
}) {
  const onPressSuggestion = () => {
    if (!alreadyAdded) onPress(suggestionKey);
  };
  return (
    <View>
      <ListItem onPress={onPressSuggestion} avatar>
        <Left>
          {poster && <Thumbnail square source={{ uri: poster }} />}
          {!poster && <Button transparent style={{ width: 57 }} /> /* FIXME: too tricky */}
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
