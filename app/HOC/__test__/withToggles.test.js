import { Text, View } from 'react-native';
import React from 'react';

import { _withToggles, makeMapStateToProps, makeMapActionsToProps } from '../withToggles';

const Component = ({ title, toggleButtons }) =>
  (<View>
    <Text>
      {title}
    </Text>
    {toggleButtons}
  </View>);

describe('With a 2 toggles and passing some title', () => {
  const toggles = [
    {
      stateKey: 'statekey0',
      selector: () => 'ASC',
      action: jest.fn(),
      buttonFacets: { ASC: <Text>A-Z</Text>, DESC: <Text>Z-A</Text> },
    },
    {
      stateKey: 'statekey1',
      selector: () => 'DESC',
      action: jest.fn(),
      buttonFacets: { ASC: <Text>up</Text>, DESC: <Text>down</Text> },
    },
  ];
  const ComponentWithToggles = _withToggles(toggles)(Component);

  const connectProps = {
    selector0: 'ASC',
    selector1: 'DESC',
    action0: jest.fn(),
    action1: jest.fn(),
  };

  const Hoc = shallow(<ComponentWithToggles title="Some title" {...connectProps} />);

  it('should match the rendered children', () => {
    expect(Hoc).toMatchSnapshot();
  });

  it('should have the right component display name', () => {
    expect(ComponentWithToggles.displayName).toEqual('withToggles(Component)');
  });

  it('gives children the title prop', () => {
    expect(Hoc.props().title).toEqual('Some title');
  });

  it('gives children the toggle button', () => {
    expect(Hoc.props().toggleButtons.length).toEqual(2);
  });

  it('calls associated action when pressing the first button', () => {
    Hoc.props().toggleButtons[0].props.onPress();
    expect(connectProps.action0).toBeCalled();
  });
});

describe('Connect() forging with 2 toggles', () => {
  const toggles = [
    {
      stateKey: 'statekey0',
      selector: jest.fn().mockReturnValue('ASC'),
      action: jest.fn(),
    },
    {
      stateKey: 'statekey1',
      selector: jest.fn().mockReturnValue('DESC'),
      action: jest.fn(),
    },
  ];
  const mapStateToProps = makeMapStateToProps({}, toggles);
  const mapActionsToProps = makeMapActionsToProps(toggles);

  it('maps state to props', () => {
    expect(mapStateToProps).toEqual({
      selector0: 'ASC',
      selector1: 'DESC',
    });
    expect(toggles[0].selector).toBeCalledWith({}, toggles[0].stateKey);
    expect(toggles[1].selector).toBeCalledWith({}, toggles[1].stateKey);
  });

  it('maps actions to props', () => {
    expect(mapActionsToProps).toEqual({
      action0: toggles[0].action,
      action1: toggles[1].action,
    });
  });
});
