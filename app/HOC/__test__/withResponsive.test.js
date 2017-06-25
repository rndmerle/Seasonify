import { Dimensions } from 'react-native';
import React from 'react';

import withResponsive from '../withResponsive';

Dimensions.get = jest.fn().mockReturnValue({
  fontscale: 2,
  scale: 2,
  width: 1260,
  heigh: 720,
});
Dimensions.addEventListener = jest.fn();

function Component() {
  return null;
}
const ResponsiveComponent = withResponsive(Component);

const Hoc = shallow(<ResponsiveComponent />);

describe('With width larger then height', () => {
  it('should render the children with LANDSCAPE orientation prop', () => {
    expect(Hoc.props()).toEqual({
      orientation: 'LANDSCAPE',
      window: {
        fontscale: 2,
        scale: 2,
        width: 1260,
        heigh: 720,
      },
    });
    expect(Hoc.find('Component')).toHaveLength(1);
  });
});
