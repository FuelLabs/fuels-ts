import { mockForcFiles } from '../../../tests/mocks/mockForcFiles';

import { types } from './types';

jest.mock('@fuel-ts/abi-typegen/runTypegen', () => {
  const original = jest.requireActual('@fuel-ts/abi-typegen/runTypegen');
  return {
    ...original,
    runTypegen: jest.fn(),
  };
});

jest.mock('fs/promises', () => {
  const original = jest.requireActual('fs/promises');
  return {
    ...original,
    writeFile: jest.fn(),
  };
});

jest.mock('../utils', () => {
  const original = jest.requireActual('../utils');
  return {
    ...original,
    logSection: jest.fn(),
  };
});

describe('Types Action', () => {
  beforeAll(() => {
    mockForcFiles();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call runTypegen with all paths', async () => {
    await types({
      basePath: '/root',
      workspace: '/root/project',
      contracts: ['/root/project/foo', '/root/project/bar'],
      predicates: ['/root/project/predicate'],
      scripts: ['/root/project/script'],
      output: '/root/types',
    });
    const { runTypegen } = jest.requireMock('@fuel-ts/abi-typegen/runTypegen');
    const { writeFile } = jest.requireMock('fs/promises');
    const { logSection } = jest.requireMock('../utils');

    expect(logSection).toHaveBeenCalledWith('🟦 Generating types...');
    expect(runTypegen).toHaveBeenCalledTimes(3);
    expect(runTypegen).toHaveBeenNthCalledWith(1, {
      programType: 'contract',
      cwd: '/root',
      filepaths: [
        '/root/project/foo/out/debug/foo_bar-abi.json',
        '/root/project/bar/out/debug/bar_foo-abi.json',
      ],
      output: '/root/types/contracts',
    });
    expect(runTypegen).toHaveBeenNthCalledWith(2, {
      programType: 'predicate',
      cwd: '/root',
      filepaths: ['/root/project/predicate/out/debug/predicate-abi.json'],
      output: '/root/types/predicates',
    });
    expect(runTypegen).toHaveBeenNthCalledWith(3, {
      programType: 'script',
      cwd: '/root',
      filepaths: ['/root/project/script/out/debug/script-abi.json'],
      output: '/root/types/scripts',
    });
    expect(writeFile).toHaveBeenCalledTimes(1);
    expect(writeFile).toHaveBeenCalledWith(
      '/root/types/index.ts',
      [
        "export * from './contracts';",
        "export * from './predicates';",
        "export * from './scripts';\n",
      ].join('\n')
    );
  });
});
