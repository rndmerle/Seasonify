import React from 'react';
import { Container, Content, List } from 'native-base';
import { connect } from 'react-redux';

import { showSelectors } from '../Redux/showRedux';
import HeaderRoot from '../Components/HeaderRoot';
import ShowItem from '../Components/ShowItem';
import SingleFAB from '../Components/SingleFAB';

const mapStateToProps = state => ({
  shows: showSelectors.getShows(state),
});

const mapActionsToProps = {};

function ShowList({ navigation, shows }) {
  const onFAB = () => {
    navigation.navigate('ShowAdd', {});
  };

  return (
    <Container>
      <Content>
        <List>
          {Object.keys(shows).map(id => (
            <ShowItem
              key={id}
              showId={id}
              showAllocine={shows[id].allocine}
              showName={shows[id].name}
              navigate={navigation.navigate}
            />
          ))}
        </List>
      </Content>
      <SingleFAB icon="add" onPress={onFAB} />
    </Container>
  );
}

ShowList.navigationOptions = ({ navigation }) => ({
  header: <HeaderRoot title="TV Shows" navigation={navigation} />,
});

export default connect(mapStateToProps, mapActionsToProps)(ShowList);
