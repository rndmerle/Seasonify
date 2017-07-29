/* @flow */
import { Fab, Icon } from 'native-base';
import { pure } from 'recompose';
import React from 'react';

import { colors } from 'Themes';

type Props = {
  /* parent */
  icon: string,
  onPress: Function,
  /* connect */
  /* HOC */
};

const enhance = pure;

function SingleFAB({ icon, onPress }: Props) {
  return (
    <Fab
      // containerStyle={{ marginRight: 10 }}
      style={{ backgroundColor: colors.icon }}
      position="bottomRight"
      onPress={onPress}
    >
      <Icon name={icon} />
    </Fab>
  );
}

export default enhance(SingleFAB);
