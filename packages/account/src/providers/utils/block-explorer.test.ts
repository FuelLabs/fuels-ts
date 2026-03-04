import { buildBlockExplorerUrl } from './block-explorer';

const DEFAULT_BLOCK_EXPLORER_URL = 'https://app.fuel.network';
const trimSlashes = /^\/|\/$/gm;

const testBlockExplorerUrlWithInputs = ({
  baseBlockExplorerUrl,
  path,
  providerUrl,
}: {
  baseBlockExplorerUrl: string;
  path: string;
  providerUrl: string;
}) => {
  const url = buildBlockExplorerUrl({
    blockExplorerUrl: baseBlockExplorerUrl,
    path,
    providerUrl,
  });

  const cleanBlockExplorerUrl = baseBlockExplorerUrl.replace(trimSlashes, '');
  const cleanPath = path.replace(trimSlashes, '');
  const cleanProviderUrl = providerUrl.replace(trimSlashes, '');
  const encodedProviderUrl = encodeURIComponent(cleanProviderUrl);

  const expectedUrl = `${cleanBlockExplorerUrl}/${cleanPath}?providerUrl=${encodedProviderUrl}`;

  expect(url).toEqual(expectedUrl);
};

/**
 * @group node
 */
describe('BlockExplorer Utils', () => {
  test('buildBlockExplorerUrl - empty/undefined inputs', () => {
    expect(buildBlockExplorerUrl()).toEqual(`${DEFAULT_BLOCK_EXPLORER_URL}/`);
    expect(
      buildBlockExplorerUrl({
        providerUrl: 'http://localhost:4000',
      })
    ).toEqual(
      `${DEFAULT_BLOCK_EXPLORER_URL}/?providerUrl=${encodeURIComponent('http://localhost:4000')}`
    );
    expect(
      buildBlockExplorerUrl({
        blockExplorerUrl: undefined,
      })
    ).toEqual(`${DEFAULT_BLOCK_EXPLORER_URL}/`);
    expect(
      buildBlockExplorerUrl({
        path: '/transaction/0x123',
      })
    ).toEqual(`${DEFAULT_BLOCK_EXPLORER_URL}/transaction/0x123`);
    expect(
      buildBlockExplorerUrl({
        providerUrl: undefined,
      })
    ).toEqual(`${DEFAULT_BLOCK_EXPLORER_URL}/`);
  });

  test('buildBlockExplorerUrl - string inputs', () => {
    const basePath = 'transaction/0x123';
    const baseBlockExplorerUrl = 'https://explorer.fuel.sh';
    const baseProviderUrl = 'https://rpc.fuel.sh';

    const pathUrls = [basePath, `/${basePath}`, `${basePath}/`, `/${basePath}/`];
    const blockExplorerUrls = [baseBlockExplorerUrl, `${baseBlockExplorerUrl}/`];
    const providerUrls = [baseProviderUrl, `${baseProviderUrl}/`];

    pathUrls.forEach((path) => {
      blockExplorerUrls.forEach((blockExplorerUrl) => {
        providerUrls.forEach((providerUrl) => {
          testBlockExplorerUrlWithInputs({
            baseBlockExplorerUrl: blockExplorerUrl,
            path,
            providerUrl,
          });
        });
      });
    });
  });

  test('buildBlockExplorerUrl - non-protocol url inputs', () => {
    const url = buildBlockExplorerUrl({
      blockExplorerUrl: 'explorer.fuel.sh',
      path: '/transaction/0x123',
      providerUrl: 'rpc.fuel.sh',
    });
    expect(url).toEqual(
      'https://explorer.fuel.sh/transaction/0x123?providerUrl=https://rpc.fuel.sh'
    );
  });

  test('buildBlockExplorerUrl - helper params', () => {
    // passing in multiple helper params should throw
    expect(() =>
      buildBlockExplorerUrl({
        address: '0x123',
        txId: '0x123',
        blockNumber: 123,
      })
    ).toThrow(
      'Only one of the following can be passed in to buildBlockExplorerUrl: address, txId, blockNumber'
    );

    // passing in path AND a helper param should throw
    const errMsg = `You cannot pass in a path to 'buildBlockExplorerUrl' along `.concat(
      'with any of the following: address, txId, blockNumber.'
    );

    expect(() =>
      buildBlockExplorerUrl({
        path: '/transaction/0x123',
        address: '0x123',
      })
    ).toThrow(errMsg);

    expect(
      buildBlockExplorerUrl({
        address: '0x123',
      })
    ).toEqual(`${DEFAULT_BLOCK_EXPLORER_URL}/address/0x123`);

    expect(
      buildBlockExplorerUrl({
        txId: '0x123',
      })
    ).toEqual(`${DEFAULT_BLOCK_EXPLORER_URL}/transaction/0x123`);

    expect(
      buildBlockExplorerUrl({
        blockNumber: 123,
      })
    ).toEqual(`${DEFAULT_BLOCK_EXPLORER_URL}/block/123`);
  });
});
