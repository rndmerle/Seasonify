import React from 'react';
import { Container, Content, List, Toast } from 'native-base';
import { connect } from 'react-redux';

import { showActions, showSelectors } from '../Redux/ShowRedux';
import HeaderRoot from '../Components/HeaderRoot';
import ShowItem from '../Components/ShowItem';
import SingleFAB from '../Components/SingleFAB';

const mapStateToProps = state => ({
  shows: showSelectors.getShows(state),
});

const mapActionsToProps = {};

export class ShowList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: <HeaderRoot title="TV Shows" navigation={navigation} />,
  });

  componentDidMount() {
    const { state } = this.props.navigation;

    if (state.params && state.params.message) {
      Toast.show(state.params.message);
    }
  }

  onFAB = () => {
    this.props.navigation.navigate('ShowAdd', {});
  };

  render() {
    const { navigation, shows } = this.props;

    return (
      <Container>
        <Content>
          <List>
            {Object.keys(shows).map(id => (
              <ShowItem
                key={id}
                show={shows[id]}
                navigate={navigation.navigate}
              />
            ))}
          </List>
        </Content>
        <SingleFAB onPress={this.onFAB} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(ShowList);
