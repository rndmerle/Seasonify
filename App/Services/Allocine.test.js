import Allocine from './Allocine';

test('Search a show with multiple result', async () => {
  const api = new Allocine();
  const response = await api.searchShows('Walking Dead');

  expect(response.error).toBeNull();
  expect(response.data).toBeTruthy();
  expect(response.data.length).toBeGreaterThan(0);
});

test('Search an unknown show', async () => {
  const api = new Allocine();
  const response = await api.searchShows('Azertyuiop');

  expect(response.error).toBeNull();
  expect(response.data).toEqual([]);
});
