import React from 'react';

import SeasonList from '../SeasonList';

function setup(specificProps = {}) {
  const props = {
    seasons: {
      abc123: {
        id: 'abc123',
        episodes: 13,
        year: 2014,
      },
      xyz890: {
        id: 'xyz890',
        episodes: 13,
        year: 2015,
      },
    },
    ...specificProps,
  };
  const component = shallow(<SeasonList {...props} />);
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
