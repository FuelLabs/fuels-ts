import * as urlIsLiveMod from './url-is-live';
import { waitUntilUnreachable } from './wait-until-unreachable';

/**
 * @group node
 */
describe('waitUntilUnreachable', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test('waits until the url is unreachable', async () => {
    const url = 'mocked';
    const urlIsLiveSpy = vi
      .spyOn(urlIsLiveMod, 'urlIsLive')
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false);

    await waitUntilUnreachable(url);

    expect(urlIsLiveSpy).toHaveBeenCalledTimes(3);
    expect(urlIsLiveSpy).toHaveBeenNthCalledWith(1, url);
    expect(urlIsLiveSpy).toHaveBeenNthCalledWith(2, url);
    expect(urlIsLiveSpy).toHaveBeenNthCalledWith(3, url);
  });

  test.fails(
    'times out test if url is live',
    async () => {
      const url = 'mocked';
      vi.spyOn(urlIsLiveMod, 'urlIsLive').mockResolvedValue(true);

      await waitUntilUnreachable(url);
    },
    { timeout: 2000 }
  );
});
