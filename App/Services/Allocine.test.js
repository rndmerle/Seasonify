import Allocine from './Allocine';

test('Search a show with multiple result', async () => {
  const api = new Allocine();
  const response = await api.searchShows('Walking');
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

test('Grab seasons list', async () => {
  const api = new Allocine();
  const response = await api.getSeasons(213);

  expect(response.error).toBeNull();
  expect(response.data).toBeTruthy();
  expect(response.data.length).toBe(3);
});
