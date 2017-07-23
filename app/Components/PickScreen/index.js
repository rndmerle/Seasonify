/* @flow */
import { Body, Button, Header, Icon, Left, Title } from 'native-base';
import React from 'react';

import PickScreen from './PickScreen';

// $FlowFixMe
PickScreen.navigationOptions = ({ navigation }) => {
  const { title, isMultiSelection } = navigation.state.params;

  return {
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name={isMultiSelection ? 'checkmark' : 'arrow-back'} />
          </Button>
        </Left>
        <Body>
          <Title>
            {title}
          </Title>
        </Body>
      </Header>
    ),
  };
};

export default PickScreen;
