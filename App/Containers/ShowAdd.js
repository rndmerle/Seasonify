import React from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import { Container, Content, Form, Label, Input, Item } from 'native-base';

import { showActions } from '../Redux/ShowRedux';
import HeaderModular from '../Components/HeaderModular';

@connect(
  () => ({}),
  showActions,
)
export default class ShowAdd extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    header: <HeaderModular
      title="New TV show"
      cancelButton={{ icon: 'close', action: navigation.goBack }}
      actionButtons={[{ text: 'ADD', action: navigation.state.params.handleSave }]}
    />,
  });

  componentWillMount() {
    this.props.navigation.setParams({
      handleSave: this.handleSave,
    });
  }

  onChangeName = (name) => {
    this.setState({ showName: name });
  };

  handleSave = () => {
    if (this.state && this.state.showName && this.state.showName.trim() !== '') {
      this.props.addShow(this.state.showName.trim());
      this.props.navigation.goBack();
      Keyboard.dismiss();
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Show&rsquo;s name</Label>
              <Input onChangeText={this.onChangeName} autoFocus autoCapitalize="words" />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
