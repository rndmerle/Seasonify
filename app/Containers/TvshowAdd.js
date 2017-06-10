import React from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import { Container, Content, Form, Label, Input, Item, List } from 'native-base';
import debounce from 'throttle-debounce/debounce';

import tv from 'State/tvshowState';
import ui from 'State/uiState';
import HeaderModular from 'Components/HeaderModular';
import SuggestionItem from 'Components/SuggestionItem';

const mapStateToProps = state => ({
  suggestions: ui.selectors.getSuggestions(state),
});

const mapActionsToProps = {
  tvshowAddWithSeasons: tv.actions.tvshowAddWithSeasons,
  suggestionsRequest: ui.actions.suggestionsRequest,
};

export function TvshowAdd({
  navigation,
  suggestions,
  tvshowAddWithSeasons,
  suggestionsRequest,
}) {
  const onChangeName = debounce(500, name => {
    suggestionsRequest(name);
  });

  const onEndName = event => {
    const name = event.nativeEvent.text;
  };

  const onPressSuggestion = suggestionKey => {
    tvshowAddWithSeasons(suggestions[suggestionKey]);
    navigation.navigate('TvshowList', {}); // Note : a goBack() would prevent Toast to stay in foreground
    Keyboard.dismiss();
  };

  return (
    <Container>
      <Content>
        <Form>
          <Item fixedLabel>
            <Label>Tvshow&rsquo;s name:</Label>
            <Input
              onChangeText={onChangeName}
              onEndEditing={onEndName}
              autoFocus
              autoCapitalize="words"
            />
          </Item>
        </Form>
        {suggestions &&
          <List>
            {suggestions.map((suggestion, key) =>
              (<SuggestionItem
                key={suggestion.allocine}
                suggestionKey={key}
                onPress={onPressSuggestion}
                poster={suggestion.poster}
                title={suggestion.name}
                subtitle={suggestion.year}
              />),
            )}
          </List>}
      </Content>
    </Container>
  );
}

TvshowAdd.navigationOptions = ({ navigation }) => ({
  header: (
    <HeaderModular
      title="New TV Show"
      cancelButton={{ icon: 'close', action: navigation.goBack }}
    />
  ),
});

export default connect(mapStateToProps, mapActionsToProps)(TvshowAdd);
