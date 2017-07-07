/* @flow */
import { Button, Text } from 'native-base';
import { compose, pure, withHandlers } from 'recompose';
import React from 'react';

import AppConfig from 'Config/AppConfig';
import HeaderRoot from 'Components/HeaderRoot';

type Props = {
  /* parent */
  title: string,
  navigation: Object,
  sortingKey: SortingValue,
  /* connect */
  sorting: SortingValue,
  toggleSorting: Function,
  /* HOC */
  toggleAction: Function,
};

const enhance = compose(
  pure,
  withHandlers({
    toggleAction: ({ toggleSorting, sortingKey }: Props) => () => {
      toggleSorting(sortingKey);
    },
  }),
);

function HeaderRootWithSorting({ title, navigation, toggleAction, sorting }: Props) {
  return (
    <HeaderRoot
      title={title}
      navigation={navigation}
      toggleButton={
        <Button transparent small onPress={toggleAction}>
          <Text>
            {AppConfig.textWhenSortingAlpha[sorting]}
          </Text>
        </Button>
      }
    />
  );
}

export default enhance(HeaderRootWithSorting);
