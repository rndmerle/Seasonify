/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { Container, Content, Form, Label, Input, Item, List } from 'native-base';
import debounce from 'throttle-debounce/debounce';

import type { Tvshow } from 'Types';
import tv from 'State/tvshowState';
import ui from 'State/uiState';
import HeaderModular from 'Components/HeaderModular';
import SuggestionItem from 'Components/SuggestionItem';

const mapStateToProps = state => ({
  suggestions: ui.selectors.getSuggestions(state),
  codes: tv.selectors.getCodes(state),
});

const mapActionsToProps = {
  tvshowAddWithSeasons: tv.actions.tvshowAddWithSeasons,
  suggestionsRequest: ui.actions.suggestionsRequest,
};

export function TvshowAdd({
  // navigation,
  suggestions,
  codes,
  tvshowAddWithSeasons,
  suggestionsRequest,
}: {
  suggestions: Tvshow[],
  codes: number[],
  tvshowAddWithSeasons: Function,
  suggestionsRequest: Function,
}) {
  let input = null;

  const onChangeName = debounce(500, name => {
    suggestionsRequest(name);
  });

  const onPressSuggestion = suggestionKey => {
    tvshowAddWithSeasons(suggestions[suggestionKey]);
    /* istanbul ignore next */
    if (input) {
      input.wrappedInstance.clear();
      input.wrappedInstance.focus();
    }
  };

  return (
    <Container>
      <Content>
        <Form>
          <Item fixedLabel>
            <Label>Tvshow&rsquo;s name:</Label>
            <Input
              onChangeText={onChangeName}
              autoFocus
              autoCapitalize="words"
              ref={/* istanbul ignore next */ ref => (input = ref)}
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
                subtitle={suggestion.year.toString()}
                alreadyAdded={!!codes.find(code => suggestion.allocine === code)}
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
