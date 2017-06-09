import api from '../Allocine';

describe('Allocine API', () => {
  it('should get a tvshow with multiple result, from a known name', async () => {
    const response = await api.searchTvshows('Happy');
    expect(response).toMatchSnapshot();
  });

  it('should get nothing from an an unknown tvshow name', async () => {
    const response = await api.searchTvshows('Azertyuiop');
    expect(response.error).toBeFalsy();
    expect(response.data).toEqual([]);
  });

  it('should grab a seasons list from a valid tvshow code', async () => {
    const response = await api.getSeasons(213);
    expect(response).toMatchSnapshot();
  });

  it('should handle error from when asking seasons list from a invalid tvshow code', async () => {
    const response = await api.getSeasons(99999);
    expect(response.error).toBeTruthy();
    expect(response.data).toBeFalsy();
  });
});

describe('Allocine API when network error', () => {
  beforeEach(() => {
    api.class.config.apiHostName = 'http://localhost';
  });

  it('should handle errors when searching tv shows', async () => {
    const response = await api.searchTvshows('Happy');
    expect(response.error).toBeTruthy();
    expect(response.data).toBeFalsy();
  });

  it('should handle errors when grabing seasons', async () => {
    const response = await api.getSeasons(213);
    expect(response.error).toBeTruthy();
    expect(response.data).toBeFalsy();
  });
});
