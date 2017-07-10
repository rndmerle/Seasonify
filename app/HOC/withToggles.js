/* @flow */
import { Button } from 'native-base';
import { compose, getDisplayName } from 'recompose';
import { connect } from 'react-redux';
import React from 'react';

type Toggle = {
  stateKey: string,
  selector: Function,
  action: Function,
  buttonFacets: { [facet: string | boolean]: React$Element<*> },
};

type Props = {
  /* HOC param */
  toggles: Toggle[],
  /* HOC */
  toggleButtons?: [Button],
  /* connect */
  selectorX: SortingValue,
  actionX: Function,
};

export const withToggles = (toggles: Toggle[]) => (
  BaseComponent: ReactClass<*>,
): ReactClass<*> =>
  class ComponentWithToggles extends React.Component<void, Props, void> {
    static displayName = `withToggles(${getDisplayName(BaseComponent)})`;

    toggles: Toggle[];
    togglesAction: Array<Function>;

    constructor(props) {
      super(props);

      this.toggles = toggles;

      this.togglesAction = this.toggles.map((toggle, index) => () =>
        this.props[`action${index}`](toggle.stateKey),
      );
    }

    render() {
      return (
        <BaseComponent
          {...this.props}
          toggleButtons={this.toggles.map((toggle, index) =>
            (<Button
              key={`${toggle.selector.name}_${toggle.stateKey}`}
              transparent
              small
              onPress={this.togglesAction[index]}
            >
              {toggle.buttonFacets[this.props[`selector${index}`]]}
            </Button>),
          )}
        />
      );
    }
  };

export const makeMapStateToProps = (state: Object, toggles: Toggle[]) =>
  toggles.reduce(
    (selectors, toggle, index) => ({
      ...selectors,
      [`selector${index}`]: toggle.selector(state, toggle.stateKey),
    }),
    {},
  );

export const makeMapActionsToProps = (toggles: Toggle[]) =>
  toggles.reduce(
    (actions, toggle, index) => ({ ...actions, [`action${index}`]: toggle.action }),
    {},
  );

const redux = (toggles: Toggle[]) =>
  connect(state => makeMapStateToProps(state, toggles), makeMapActionsToProps(toggles));

export default (toggles: Toggle[]) => compose(redux(toggles), withToggles(toggles));
