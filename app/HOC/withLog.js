/* @flow */
import { getDisplayName, setDisplayName, wrapDisplayName } from 'recompose';
import { diff } from 'deep-diff';
import React from 'react';

export default function witLog(BaseComponent: ReactClass<*>) {
  class LoggedComponent extends React.PureComponent<void, Object, void> {
    static displayName = getDisplayName(BaseComponent);
    static navigationOptions = BaseComponent.navigationOptions;

    componentWillReceiveProps(newProps: Object) {
      const deepDiff = diff(this.props, newProps);
      if (deepDiff) {
        console.log(`...Diff props for ${BaseComponent.name}`, deepDiff); // eslint-disable-line no-console
      }
    }

    render() {
      console.log(`\n${BaseComponent.name} Rendering`); // eslint-disable-line no-console
      return <BaseComponent {...this.props} />;
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withLog'))(LoggedComponent);
  }
  return LoggedComponent;
}

// const withLog = BaseComponent => props => {
//   console.log(`\nRendering ${BaseComponent.name}`);
//   return <BaseComponent {...props} />;
// };
// export default withLog;
