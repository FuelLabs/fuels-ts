import { buildBlockExplorerUrl } from './util';

const DEFAULT_BLOCK_EXPLORER_URL = 'https://fuellabs.github.io/block-explorer-v2';
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

describe('Providers utils', () => {
  test('buildBlockExplorerUrl - empty/undefined inputs', () => {
    const url = buildBlockExplorerUrl({
      blockExplorerUrl: undefined,
      path: '/transaction/0x123',
      providerUrl: undefined,
    });

    expect(url).toEqual(`${DEFAULT_BLOCK_EXPLORER_URL}/transaction/0x123`);
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

    // passing in neither path nor a helper param should throw
    expect(() => buildBlockExplorerUrl({})).toThrow(
      'One of the following must be passed in to buildBlockExplorerUrl: address, txId, blockNumber, path'
    );

    // passing in path AND a helper param should throw
    expect(() =>
      buildBlockExplorerUrl({
        path: '/transaction/0x123',
        address: '0x123',
      })
    ).toThrow(
      'You cannot pass in a path to buildBlockExplorerUrl along with any of the following: address, txId, blockNumber'
    );

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
