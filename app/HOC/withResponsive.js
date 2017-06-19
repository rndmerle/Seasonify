// @flow
import { Dimensions } from 'react-native';
import { setDisplayName, wrapDisplayName } from 'recompose';
import React from 'react';
import getDisplayName from 'recompose/getDisplayName';

type State = {
  window: Object,
  orientation: 'PORTRAIT' | 'LANDSCAPE',
};

export default function withResponsive(BaseComponent: ReactClass<*>) {
  class ResponsiveComponent extends React.Component<void, Object, State> {
    static displayName = getDisplayName(BaseComponent);

    static computeOrientation = (dimensions: Object) =>
      dimensions.height > dimensions.width ? 'PORTRAIT' : 'LANDSCAPE';

    state = {
      orientation: ResponsiveComponent.computeOrientation(Dimensions.get('window')),
      window: Dimensions.get('window'),
    };

    componentWillMount() {
      Dimensions.addEventListener('change', this.handleDimensionsChange);
    }

    componentWillUnmount() {
      Dimensions.removeEventListener('change', this.handleDimensionsChange);
    }

    handleDimensionsChange = (dimensions: Object) => {
      this.setState({
        window: dimensions.window,
        orientation: ResponsiveComponent.computeOrientation(dimensions),
      });
    };

    render() {
      return <BaseComponent {...this.props} {...this.state} />;
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withResponsive'))(
      ResponsiveComponent,
    );
  }
  return ResponsiveComponent;
}
