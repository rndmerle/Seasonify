import tvshowsNormalizer from '../tvshowsNormalizer';

const input = require('../../Fixtures/apiSearchHappy.json');

test('tvshowsNormalizer output should match snapshot', () => {
  expect(tvshowsNormalizer(input)).toMatchSnapshot();
});
