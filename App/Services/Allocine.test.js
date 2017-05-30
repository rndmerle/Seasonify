import Allocine from './Allocine';

test('TVshow search on Allocine API', async () => {
  const api = new Allocine();
  const response = await api.searchShow('Walking Dead');
  // console.log(response.data.feed.tvseries);
  expect(response.data.feed.tvseries.length).toBeGreaterThan(0);
});
