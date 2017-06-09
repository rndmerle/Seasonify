import React from 'react';
import Poster from '../Poster';

function setup(specificProps = {}) {
  const props = {
    url: 'http://somewhere.net/poster.jpg',
    ...specificProps,
  };
  const component = shallow(<Poster {...props} />);
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
