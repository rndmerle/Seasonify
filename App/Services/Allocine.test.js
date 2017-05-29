import { searchShow } from './Allocine';

test('TVshow search on Allocine API', async () => {
  // expect.assertions(1);
  const response = await searchShow('Walking Dead');
  expect(response.data.feed.tvseries.length).toBeGreaterThan(0);
});
