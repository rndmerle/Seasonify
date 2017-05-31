import React from 'react';
import { Container, Content, List } from 'native-base';
import { connect } from 'react-redux';

import { showActions, showSelectors } from '../Redux/showRedux';
import HeaderRoot from '../Components/HeaderRoot';
import ShowItem from '../Components/ShowItem';
import SingleFAB from '../Components/SingleFAB';

const mapStateToProps = state => ({
  shows: showSelectors.getShows(state),
});

const mapActionsToProps = {};

export class _ShowList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: <HeaderRoot title="TV Shows" navigation={navigation} />,
  });

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
                showId={id}
                showName={shows[id].name}
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

export default connect(mapStateToProps, mapActionsToProps)(_ShowList);
