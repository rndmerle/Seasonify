import isEmpty from '../isEmpty';

test('Not empty array is not empty', () => {
  const subject = [''];
  expect(isEmpty(subject)).toBeFalsy();
});

test('Empty array is empty', () => {
  const subject = [];
  expect(isEmpty(subject)).toBeTruthy();
});

test('Not empty string is not empty', () => {
  const subject = 'abc';
  expect(isEmpty(subject)).toBeFalsy();
});

test('Empty string is empty', () => {
  const subject = '';
  expect(isEmpty(subject)).toBeTruthy();
});

test('Not empty object is not empty', () => {
  const subject = { key: '' };
  expect(isEmpty(subject)).toBeFalsy();
});

test('Empty object is empty', () => {
  const subject = {};
  expect(isEmpty(subject)).toBeTruthy();
});

test('null object is empty', () => {
  const subject = null;
  expect(isEmpty(subject)).toBeTruthy();
});
