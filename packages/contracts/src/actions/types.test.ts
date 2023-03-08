import { mockForcFiles } from '../../tests/mocks/mockForcFiles';

import { types } from './types';

jest.mock('@fuel-ts/abi-typegen', () => {
  const original = jest.requireActual('@fuel-ts/abi-typegen');
  return {
    ...original,
    runTypegen: jest.fn(),
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

  it('should call build, deploy and types', async () => {
    await types({
      basePath: '/root',
      workspace: '/root/contracts',
      contracts: ['/root/contracts/foo', '/root/contracts/bar'],
      output: '/root/types',
    });
    const { runTypegen } = jest.requireMock('@fuel-ts/abi-typegen');
    const { logSection } = jest.requireMock('../utils');

    expect(logSection).toHaveBeenCalledWith('🟦 Generating types...');
    expect(runTypegen).toHaveBeenCalledTimes(1);
    expect(runTypegen).toHaveBeenCalledWith({
      programType: 'contract',
      cwd: '/root',
      filepaths: [
        '/root/contracts/foo/out/debug/foo_bar-abi.json',
        '/root/contracts/bar/out/debug/bar_foo-abi.json',
      ],
      output: '/root/types',
    });
  });
});
