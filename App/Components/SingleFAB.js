import React from 'react';
import { Fab, Icon } from 'native-base';

const SingleFAB = ({ icon, onPress }) => (
  <Fab
    // containerStyle={{ marginRight: 10 }}
    style={{ backgroundColor: '#5067FF' }}
    position="bottomRight"
    onPress={onPress}
  >
    <Icon name={icon} />
  </Fab>
);

export default SingleFAB;
