import { buildBlockExplorerUrl } from './util';

const DEFAULT_BLOCK_EXPLORER_URL = 'https://fuellabs.github.io/block-explorer-v2';

describe('Providers utils', () => {
  test('Builds block explorer links using buildBlockExplorerUrl', () => {
    const result = buildBlockExplorerUrl({ path: '/transaction/0x123' });
    expect(result).toEqual(`${DEFAULT_BLOCK_EXPLORER_URL}/transaction/0x123`);

    const result2 = buildBlockExplorerUrl({
      blockExplorerUrl: 'https://explorer.fuel.sh',
      path: '/transaction/0x123',
    });
    expect(result2).toEqual('https://explorer.fuel.sh/transaction/0x123');
  });
});
