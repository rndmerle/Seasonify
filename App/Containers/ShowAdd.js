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

import { showActions } from '../Redux/showRedux';
import { uiActions, uiSelectors } from '../Redux/uiRedux';
import HeaderModular from '../Components/HeaderModular';
import SuggestionItem from '../Components/SuggestionItem';

const mapStateToProps = state => ({
  suggestions: uiSelectors.getSuggestions(state),
});

const mapActionsToProps = {
  addShow: showActions.addShow,
  suggestionsRequest: uiActions.suggestionsRequest,
};

function ShowAdd({ navigation, suggestions, addShow, suggestionsRequest }) {
  const onChangeName = debounce(500, name => {
    suggestionsRequest(name);
  });

  const onEndName = event => {
    const name = event.nativeEvent.text;
  };

  const onPressSuggestion = suggestionKey => {
    addShow(suggestions[suggestionKey]);
    navigation.goBack();
    Keyboard.dismiss();
  };

  return (
    <Container>
      <Content>
        <Form>
          <Item fixedLabel>
            <Label>Show&rsquo;s name:</Label>
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

ShowAdd.navigationOptions = ({ navigation }) => ({
  header: (
    <HeaderModular
      title="New TV show"
      cancelButton={{ icon: 'close', action: navigation.goBack }}
    />
  ),
});

export default connect(mapStateToProps, mapActionsToProps)(ShowAdd);
