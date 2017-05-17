import { trimmed, collecToArray } from './Helpers';

test('trim a single string', () => {
  expect(trimmed(' Text  ')).toEqual('Text');
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
  const expected = [
    { id: '123', description: 'abc' },
    { id: '456', description: 'xyz' },
  ];
  expect(collecToArray(input)).toEqual(expected);
});
