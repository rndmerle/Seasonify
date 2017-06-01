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

export class _ShowAdd extends React.Component {
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
  };

  onPressSuggestion = suggestionKey => {
    this.props.addShow(this.props.suggestions[suggestionKey]);
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
              {this.props.suggestions.map((suggestion, key) => {
                return (
                  <SuggestionItem
                    key={suggestion.allocine}
                    suggestionKey={key}
                    onPress={this.onPressSuggestion}
                    poster={suggestion.poster}
                    title={suggestion.name}
                    subtitle={suggestion.year}
                  />
                );
              })}
            </List>}
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(_ShowAdd);
