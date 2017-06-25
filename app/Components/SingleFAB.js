/* @flow */
import { Fab, Icon } from 'native-base';
import React from 'react';

export default function SingleFAB({ icon, onPress }: { icon: string, onPress: Function }) {
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
