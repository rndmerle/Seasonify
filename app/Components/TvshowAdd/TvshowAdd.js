/* @flow */
import { Container, Content, Form, Label, Input, Item, List } from 'native-base';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';
import debounce from 'throttle-debounce/debounce';

import type { Tvshow } from 'Types';
import SuggestionItem from 'Components/SuggestionItem';

type Props = {
  /* parent */
  /* connect */
  suggestions: Tvshow[],
  codes: number[],
  tvshowAddWithSeasons: Function,
  suggestionsRequest: Function,
  /* state */
  /* handlers */
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
            // input.wrappedInstance.focus();
          }
        },
      };
    },
  ),
);

function TvshowAdd({
  suggestions,
  codes,
  registerInput,
  handleChangeName,
  handlePressSuggestion,
}: Props) {
  return (
    <Container>
      <Content>
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
                suggestionKey={key}
                onPress={handlePressSuggestion}
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

export default enhance(TvshowAdd);
