import { SwayType } from './types';
import {
  readForcToml,
  getContractName,
  getContractCamelCase,
  getBinaryPath,
  getABIPaths,
  getABIPath,
  readSwayType,
} from './utils';

jest.mock('fs/promises', () => ({
  readFile: jest.fn((filepath: string) => {
    if (filepath.endsWith('.toml')) {
      return `[project]
      authors = ["Fuel Labs <contact@fuel.sh>"]
      entry = "main.sw"
      license = "Apache-2.0"
      name = "bar_foo"
      
      [dependencies]`;
    }
    if (filepath.endsWith('.sw')) {
      return `contract;\n`;
    }
    throw new Error('No file found!');
  }),
}));

describe('Services Forc Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('[readForcToml] Should readFile from file system and from cache on second hit', async () => {
    const readFileMock = jest.requireMock('fs/promises').readFile;
    const result = await readForcToml('/root');
    expect(readFileMock).toHaveBeenCalledWith('/root/Forc.toml', 'utf8');
    expect(readFileMock).toHaveBeenCalledTimes(1);
    expect(result.dependencies).toEqual({});
    expect(result.project).toEqual({
      entry: 'main.sw',
      license: 'Apache-2.0',
      name: 'bar_foo',
      authors: ['Fuel Labs <contact@fuel.sh>'],
    });
    // Should not call readFile again on the second call
    const resultFromCache = await readForcToml('/root');
    expect(readFileMock).toHaveBeenCalledTimes(1);
    expect(resultFromCache.dependencies).toEqual({});
    expect(resultFromCache.project).toEqual({
      entry: 'main.sw',
      license: 'Apache-2.0',
      name: 'bar_foo',
      authors: ['Fuel Labs <contact@fuel.sh>'],
    });
  });

  it('[readSwayType] Should readFile from file system and from cache on second hit', async () => {
    const readFileMock = jest.requireMock('fs/promises').readFile;
    const swayType = await readSwayType('/root');
    expect(readFileMock).toHaveBeenCalledWith('/root/src/main.sw', 'utf8');
    expect(readFileMock).toHaveBeenCalledTimes(1);
    expect(swayType).toEqual(SwayType.contract);
    // Should not call readFile again on the second call
    const swayTypeCache = await readSwayType('/root');
    expect(readFileMock).toHaveBeenCalledTimes(1);
    expect(swayTypeCache).toEqual(SwayType.contract);
  });

  it('[getContractName] Should return the name from Forc.toml', async () => {
    const contractName = await getContractName('/root');
    expect(contractName).toEqual('bar_foo');
  });

  it('[getContractCamelCase] Should return the a camelCase name from Forc.toml', async () => {
    const projectName = await getContractCamelCase('/root');
    expect(projectName).toEqual('barFoo');
  });

  it('[getBinaryPath] Should return the binary path based on the name from Forc.toml', async () => {
    const binaryPath = await getBinaryPath('/root/bar');
    expect(binaryPath).toEqual('/root/bar/out/debug/bar_foo.bin');
  });

  it('[getABIPath] Should return the ABI json path based on the name from Forc.toml', async () => {
    const ABIPath = await getABIPath('/root/bar');
    expect(ABIPath).toEqual('/root/bar/out/debug/bar_foo-abi.json');
  });

  it('[getABIPaths] Should return the all ABI json paths based on the name from Forc.toml', async () => {
    const ABIPaths = await getABIPaths(['/root/bar', '/root/foo']);
    expect(ABIPaths).toEqual([
      '/root/bar/out/debug/bar_foo-abi.json',
      '/root/foo/out/debug/bar_foo-abi.json',
    ]);
  });
});
