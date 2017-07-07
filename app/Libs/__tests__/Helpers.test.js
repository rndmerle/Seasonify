import { collecToArray, getContrastingTextColor, sortAlpha, trimmed } from 'Libs/Helpers';

test('trim a single string', () => {
  expect(trimmed(' Text  ')).toEqual('Text');
});

test('do not trim an int', () => {
  expect(trimmed(123)).toEqual(123);
});

test('trim an object', () => {
  expect(trimmed({ id: 123, name: ' Name  ' })).toEqual({ id: 123, name: 'Name' });
});

test('trim an array', () => {
  expect(trimmed([123, ' Name  '])).toEqual([123, 'Name']);
});

test('transform a empty collection to an array', () => {
  const input = {};
  const expected = [];
  expect(collecToArray(input)).toEqual(expected);
});

test('transform a collection to an array', () => {
  const input = {
    123: { description: 'abc' },
    456: { description: 'xyz' },
  };
  const expected = [{ id: '123', description: 'abc' }, { id: '456', description: 'xyz' }];
  expect(collecToArray(input)).toEqual(expected);
});

describe('getContrastingTextColor()', () => {
  describe('with a dark background', () => {
    const backgroundColor = '#4466ff';
    it('gives a white foreground', () => {
      expect(getContrastingTextColor(backgroundColor)).toEqual('#ffffff');
    });
  });
  describe('with a light background', () => {
    const backgroundColor = '#aaaaff';
    it('gives a black foreground', () => {
      expect(getContrastingTextColor(backgroundColor)).toEqual('#000000');
    });
  });
});

describe('alphaSort', () => {
  const left = 'alpha';
  const right = 'Zulu';

  describe('with ASC', () => {
    const sorting = 'ASC';

    it('sorts from lower to higher alphanumeric', () => {
      expect(sortAlpha(sorting, left, right)).toEqual(-1);
    });
  });

  describe('with DESC', () => {
    const sorting = 'DESC';

    it('sorts from lower to higher alphanumeric', () => {
      expect(sortAlpha(sorting, left, right)).toEqual(1);
    });
  });
});
