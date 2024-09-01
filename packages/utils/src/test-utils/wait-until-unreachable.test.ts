import { waitUntilUnreachable } from './wait-until-unreachable';

/**
 * @group node
 */
describe('waitUntilUnreachable', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('waits until the url is unreachable', async () => {
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve(new Response()))
      .mockImplementationOnce(() => Promise.resolve(new Response()))

      .mockImplementationOnce(() => {
        throw new Error('mocked');
      });
    const url = 'mocked';

    await waitUntilUnreachable(url);

    expect(fetchSpy).toHaveBeenCalledTimes(3);
    expect(fetchSpy).toHaveBeenNthCalledWith(1, url);
    expect(fetchSpy).toHaveBeenNthCalledWith(2, url);
    expect(fetchSpy).toHaveBeenNthCalledWith(3, url);
  });

  test.fails(
    'times out test if url is live',
    async () => {
      vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response()));

      const url = 'mocked';

      await waitUntilUnreachable(url);
    },
    { timeout: 2000 }
  );
});
