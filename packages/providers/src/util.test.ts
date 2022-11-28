import { buildBlockExplorerUrl } from './util';

describe('Providers utils', () => {
  const DEFAULT_BLOCK_EXPLORER_URL = 'https://fuellabs.github.io/block-explorer-v2';

  test('Builds block explorer URL in every possible way', () => {
    const trimSlashes = /^\/|\/$/gm;
    const basePath = 'transaction/0x123';
    const baseBlockExplorerUrl = 'https://explorer.fuel.sh';

    // Here, we assemble and iterate over all possible combinations of
    // `blockExplorerUrl` and `path` by adding leading/trailing slashes to them
    const pathUrls = [basePath, `/${basePath}`, `${basePath}/`, `/${basePath}/`];
    const blockExplorerUrls = [undefined, baseBlockExplorerUrl, `${baseBlockExplorerUrl}/`];
    const providerUrls = [undefined, 'https://rpc.fuel.sh', 'https://rpc.fuel.sh/'];

    pathUrls.forEach((path) => {
      blockExplorerUrls.forEach((blockExplorerUrl) => {
        // First, we clean paths manually
        const cleanPath = path.replace(trimSlashes, '');
        const cleanBlockExplorerUrl = blockExplorerUrl
          ? blockExplorerUrl.replace(trimSlashes, '')
          : DEFAULT_BLOCK_EXPLORER_URL;

        // Then we compare them with the ones returned by our method
        providerUrls.forEach((providerUrl) => {
          const cleanProviderUrl = providerUrl?.replace(trimSlashes, '');
          const encodedProviderUrl = cleanProviderUrl
            ? encodeURIComponent(cleanProviderUrl)
            : undefined;
          const expected = `${cleanBlockExplorerUrl}/${cleanPath}${
            cleanProviderUrl ? `?providerUrl=${encodedProviderUrl}` : ''
          }`;
          expect(buildBlockExplorerUrl({ path, blockExplorerUrl, providerUrl })).toBe(expected);
        });
      });
    });
  });
});
