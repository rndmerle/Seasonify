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
  Toast,
} from 'native-base';
import debounce from 'throttle-debounce/debounce';

import { showActions } from '../Redux/ShowRedux';
import { uiActions, uiSelectors } from '../Redux/UiRedux';
import HeaderModular from '../Components/HeaderModular';
import SuggestionItem from '../Components/SuggestionItem';
import { errorMessage } from '../Config/DefaultMessages';

const mapStateToProps = state => ({
  suggestions: uiSelectors.getSuggestions(state),
});

const mapActionsToProps = {
  addShow: showActions.addShow,
  suggestionsRequest: uiActions.suggestionsRequest,
};

export class ShowAdd extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <HeaderModular
        title="New TV show"
        cancelButton={{ icon: 'close', action: navigation.goBack }}
      />
    ),
  });

  onChangeName = debounce(500, name => {
    this.props.suggestionsRequest(name);
  });

  onEndName = event => {
    const name = event.nativeEvent.text;
    this.props.suggestionsRequest(name);
  };

  onPressSuggestion = suggestionKey => {
    const {
      code,
      originalTitle,
      yearStart,
      poster: { href: posterURL },
      seasonCount,
    } = this.props.suggestions[suggestionKey];

    this.props.addShow(
      code,
      originalTitle,
      String(yearStart),
      posterURL,
      String(seasonCount),
    );

    this.props.navigation.goBack();
    Keyboard.dismiss();
  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Show&rsquo;s name:</Label>
              <Input
                onChangeText={this.onChangeName}
                onEndEditing={this.onEndName}
                autoFocus
                autoCapitalize="words"
              />
            </Item>
          </Form>
          {this.props.suggestions &&
            <List>
              {Object.keys(this.props.suggestions).map(key => {
                const suggestion = this.props.suggestions[key];
                return (
                  <SuggestionItem
                    key={key}
                    suggestionKey={key}
                    onPress={this.onPressSuggestion}
                    posterURL={
                      suggestion.poster ? suggestion.poster.href : null
                    }
                    title={suggestion.originalTitle}
                    subtitle={suggestion.yearStart}
                  />
                );
              })}
            </List>}
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(ShowAdd);
