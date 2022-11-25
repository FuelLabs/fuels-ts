import { buildBlockExplorerUrl } from './util';

const DEFAULT_BLOCK_EXPLORER_URL = 'https://fuellabs.github.io/block-explorer-v2';

interface TestCase {
  path: string;
  blockExplorerUrl?: string;
  expected: string;
}

const basePath = 'transaction/0x123';
const customBlockExplorerUrl = 'https://explorer.fuel.sh';

const generateTestCases = (): TestCase[] => {
  // iterate over all possible combinations of blockExplorerUrl and path by adding leading and trailing slashes, and generate test cases
  const testCases: TestCase[] = [];
  [undefined, customBlockExplorerUrl].forEach((blockExplorerUrl) => {
    [basePath, `/${basePath}`, `${basePath}/`, `/${basePath}/`].forEach((path) => {
      const trimSlashes = /^\/|\/$/gm;
      const cleanPath = path.replace(trimSlashes, '');
      const cleanBlockExplorerUrl = blockExplorerUrl?.replace(trimSlashes, '');
      testCases.push({
        path,
        blockExplorerUrl,
        expected: `${cleanBlockExplorerUrl || DEFAULT_BLOCK_EXPLORER_URL}/${cleanPath}`,
      });
    });
  });
  return testCases;
};

describe('Providers utils', () => {
  test('Builds block explorer links using buildBlockExplorerUrl', () => {
    const testCases = generateTestCases();
    testCases.forEach(({ path, blockExplorerUrl, expected }) => {
      expect(buildBlockExplorerUrl({ path, blockExplorerUrl })).toBe(expected);
    });
  });
});
