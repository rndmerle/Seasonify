import api from '../Allocine';
import fixtures from '../apiFixtures';

describe('Allocine API and Fixtures should match when', () => {
  it('query tv shows', async () => {
    const apiResponse = await api.searchTvshows('Happy');
    const fixResponse = fixtures.searchTvshows('Happy');
    expect(fixResponse).toEqual(apiResponse);
  });

  it('query with an empty name ', async () => {
    const apiResponse = await api.searchTvshows('');
    const fixResponse = fixtures.searchTvshows('');
    expect(fixResponse).toEqual(apiResponse);
  });

  it('query seasons', async () => {
    const apiResponse = await api.getSeasons(213);
    const fixResponse = fixtures.getSeasons(213);
    expect(fixResponse).toEqual(apiResponse);
  });
});
