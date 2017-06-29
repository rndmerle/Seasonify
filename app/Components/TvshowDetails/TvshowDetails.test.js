import { Container } from 'native-base';
import React from 'react';

import SingleFAB from 'Components/SingleFAB';
import TvshowSheet from 'Components/TvshowSheet';

import TvshowDetails from './TvshowDetails';

function setup(specificProps = {}) {
  const props = {
    navigation: {
      navigate: jest.fn(),
      state: { params: { tvshowId: 'abc123' } },
    },
    tvshow: {
      id: 'abc123',
      name: 'A tvshow',
      localizedName: 'Une série',
      poster: 'http://poster.png',
      year: 2017,
      seasons: {
        id: 'xxx999',
        allocine: 987,
        year: 2016,
        episodes: 1,
      },
    },
    isEditing: false,
    editedObject: {},
    editUpdate: jest.fn(),
    seasonsRefresh: jest.fn(),
    ...specificProps,
  };
  const component = shallowDive(<TvshowDetails {...props} />, Container);
  return {
    component,
    props,
  };
}

describe('Rendering when default state', () => {
  const { component } = setup();
  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});

describe('Rendering when no tvshow', () => {
  const { component } = setup({ tvshow: undefined });
  it('should match', () => {
    expect(component).toMatchSnapshot();
  });
});

/* ========= Events & Functions ========= */

describe('Events & Functions', () => {
  const { component, props } = setup();
  const tvshowSheet = component.find(TvshowSheet);
  const singleFAB = component.find(SingleFAB);

  describe('when calling onChangeName', () => {
    tvshowSheet.prop('onChangeName')('New name');

    it('calls editUpdate', () => {
      expect(props.editUpdate).toBeCalledWith({
        id: props.tvshow.id,
        name: 'New name',
      });
    });
  });

  describe('when calling onPress', () => {
    singleFAB.prop('onPress')();

    it('calls seasonsRefresh', () => {
      expect(props.seasonsRefresh).toBeCalledWith(props.tvshow.id);
    });
  });
});
