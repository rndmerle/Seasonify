import React from 'react';
import { Fab, Icon } from 'native-base';

const SingleFAB = ({ onPress }) => (
  <Fab
      // containerStyle={{ marginRight: 10 }}
    style={{ backgroundColor: '#5067FF' }}
    position="bottomRight"
    onPress={onPress}
  >
    <Icon name="add" />
  </Fab>
  );

export default SingleFAB;
