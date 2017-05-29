import { searchShow } from './Allocine';

test('TVshow search on Allocine API', async () => {
  // expect.assertions(1);
  const response = await searchShow('Walking Dead');
  console.log(response.data.feed.tvseries);
  expect(response.data.feed.tvseries.length).toBeGreaterThan(0);
});
