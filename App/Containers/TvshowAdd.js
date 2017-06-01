import React from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import {
  Container,
  Content,
  Form,
  Label,
  Input,
  Item,
  List,
} from 'native-base';
import debounce from 'throttle-debounce/debounce';

import { tvshowActions } from '../Redux/tvshowRedux';
import { uiActions, uiSelectors } from '../Redux/uiRedux';
import HeaderModular from '../Components/HeaderModular';
import SuggestionItem from '../Components/SuggestionItem';

const mapStateToProps = state => ({
  suggestions: uiSelectors.getSuggestions(state),
});

const mapActionsToProps = {
  addTvshowWithSeasons: tvshowActions.addTvshowWithSeasons,
  suggestionsRequest: uiActions.suggestionsRequest,
};

function TvshowAdd({
  navigation,
  suggestions,
  addTvshowWithSeasons,
  suggestionsRequest,
}) {
  const onChangeName = debounce(500, name => {
    suggestionsRequest(name);
  });

  const onEndName = event => {
    const name = event.nativeEvent.text;
  };

  const onPressSuggestion = suggestionKey => {
    addTvshowWithSeasons(suggestions[suggestionKey]);
    navigation.goBack();
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
            {suggestions.map((suggestion, key) => (
              <SuggestionItem
                key={suggestion.allocine}
                suggestionKey={key}
                onPress={onPressSuggestion}
                poster={suggestion.poster}
                title={suggestion.name}
                subtitle={suggestion.year}
              />
            ))}
          </List>}
      </Content>
    </Container>
  );
}

TvshowAdd.navigationOptions = ({ navigation }) => ({
  header: (
    <HeaderModular
      title="New TV tvshow"
      cancelButton={{ icon: 'close', action: navigation.goBack }}
    />
  ),
});

export default connect(mapStateToProps, mapActionsToProps)(TvshowAdd);
