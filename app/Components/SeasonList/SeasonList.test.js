import { List } from 'native-base';
import React from 'react';

import SeasonList from './SeasonList';

function setup(specificProps = {}) {
  const props = {
    seasons: {
      1: {
        id: 1,
        episodes: 13,
        year: 2014,
      },
      2: {
        id: 2,
        episodes: 13,
        year: 2015,
      },
    },
    seasonViewings: {
      2: [
        {
          friendId: 'f1',
          name: 'Friend 1',
          color: 'pink',
        },
        {
          friendId: 'f2',
          name: 'Friend 2',
          color: 'blue',
        },
      ],
    },
    ...specificProps,
  };
  const component = shallowDive(<SeasonList {...props} />, List);
  return {
    component,
    props,
  };
}

describe('Rendering', () => {
  it('should render', () => {
    const { component } = setup();
    expect(component).toMatchSnapshot();
  });
});
