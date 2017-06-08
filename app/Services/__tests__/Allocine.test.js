import * as api from '../Allocine';

describe('Allocine API', () => {
  it('should get a tvshow with multiple result, from a known name', async () => {
    const response = await api.searchTvshows('Happy');
    expect(response).toMatchSnapshot();
  });

  it('should get nothing from an an unknown tvshow', async () => {
    const response = await api.searchTvshows('Azertyuiop');
    expect(response).toMatchSnapshot();
  });

  it('should grab a seasons list from a valid tvshow code', async () => {
    const response = await api.getSeasons(213);
    expect(response).toMatchSnapshot();
  });
});
