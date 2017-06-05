import React from 'react';
import { Fab, Icon } from 'native-base';

export default function SingleFAB({ icon, onPress }) {
  return (
    <Fab
      // containerStyle={{ marginRight: 10 }}
      style={{ backgroundColor: '#5067FF' }}
      position="bottomRight"
      onPress={onPress}
    >
      <Icon name={icon} />
    </Fab>
  );
}
