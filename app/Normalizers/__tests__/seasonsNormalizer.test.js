import seasonsNormalizer from '../seasonsNormalizer';

const input = require('../../Fixtures/apiSeasonsDeadwood.json');

test('seasonsNormalizer output should match snapshot (included a boggus "0" season)', () => {
  expect(seasonsNormalizer([...input, { seasonNumber: 0 }])).toMatchSnapshot();
});
