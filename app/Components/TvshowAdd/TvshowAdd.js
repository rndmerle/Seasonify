/* @flow */
import { Container, Content, Form, Label, Input, Item, List } from 'native-base';
import { Keyboard } from 'react-native';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';
import debounce from 'throttle-debounce/debounce';

import SuggestionItem from 'Components/SuggestionItem';

type Props = {
  /* parent */
  navigation: Object,
  /* connect */
  suggestions: Tvshow[],
  codes: number[],
  tvshowAddWithSeasons: Function,
  suggestionsRequest: Function,
  /* HOC */
  registerInput: Function,
  handleChangeName: Function,
  handlePressSuggestion: Function,
};

const enhance = compose(
  pure,
  withHandlers(
    (/* props */) => {
      let input;
      return {
        registerInput: () => ref => {
          input = ref;
        },
        handleChangeName: ({ suggestionsRequest }: Props) =>
          debounce(500, (name: string) => {
            suggestionsRequest(name);
          }),
        handlePressSuggestion: ({ suggestions, tvshowAddWithSeasons }: Props) => (
          suggestionKey: number,
        ) => {
          tvshowAddWithSeasons(suggestions[suggestionKey]);
          /* istanbul ignore next */
          if (input) {
            input.wrappedInstance.clear();
            Keyboard.dismiss();
          }
        },
      };
    },
  ),
);

function TvshowAdd({
  suggestions,
  registerInput,
  navigation,
  handleChangeName,
  handlePressSuggestion,
}: Props) {
  return (
    <Container>
      <Content keyboardShouldPersistTaps="handled" keyboardDismissMode="none">
        <Form>
          <Item fixedLabel>
            <Label>Tvshow&rsquo;s name:</Label>
            <Input
              onChangeText={handleChangeName}
              autoFocus
              autoCapitalize="words"
              ref={/* istanbul ignore next */ ref => registerInput(ref)}
            />
          </Item>
        </Form>
        {suggestions &&
          <List>
            {suggestions.map((suggestion, key) =>
              (<SuggestionItem
                key={suggestion.allocine}
                navigation={navigation}
                suggestionKey={key}
                suggestionAllocine={suggestion.allocine}
                onPress={handlePressSuggestion}
                poster={suggestion.poster}
                title={suggestion.name}
                subtitle={suggestion.year.toString()}
              />),
            )}
          </List>}
      </Content>
    </Container>
  );
}

export default enhance(TvshowAdd);
