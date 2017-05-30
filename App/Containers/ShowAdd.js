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

import { showActions } from '../Redux/ShowRedux';
import HeaderModular from '../Components/HeaderModular';
import SuggestionItem from '../Components/SuggestionItem';
import { errorMessage } from '../Config/DefaultMessages';
import Allocine from '../Services/Allocine';

const mapStateToProps = null; // state => ({});

const mapActionsToProps = {
  addShow: showActions.addShow,
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

  componentWillMount() {
    this.setState({ suggestions: [] });
  }

  onChangeName = name => {
    this.setState({ showName: name });
  };

  onSearchName = event => {
    const typedName = event.nativeEvent.text;
    const api = new Allocine();
    api
      .searchShow(typedName)
      .then(result => {
        this.setState({ suggestions: result.data.feed.tvseries });
      })
      .catch(error => {
        Toast.show({
          ...errorMessage,
          text: `No tvshow suggestion from online database: ${error.message}`,
        });
      });
  };

  onPressSuggestion = suggestionKey => {
    const {
      code,
      originalTitle,
      yearStart,
      poster: { href: posterURL },
      seasonCount,
    } = this.state.suggestions[suggestionKey];

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
            <Item floatingLabel>
              <Label>Show&rsquo;s name</Label>
              <Input
                onChangeText={this.onChangeName}
                onEndEditing={this.onSearchName}
                autoFocus
                autoCapitalize="words"
              />
            </Item>
          </Form>
          {this.state.suggestions &&
            <List>
              {Object.keys(this.state.suggestions).map(key => {
                const suggestion = this.state.suggestions[key];
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
