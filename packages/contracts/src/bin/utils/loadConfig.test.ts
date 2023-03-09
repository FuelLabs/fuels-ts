/* eslint-disable @typescript-eslint/no-explicit-any */
import JoyCon from 'joycon';

import { forcFiles } from '../../services';

import { loadConfig } from './loadConfig';

jest.mock('bundle-require', () => ({
  bundleRequire: jest.fn(),
}));

describe('Bin Utils loadConfig', () => {
  beforeEach(() => {
    jest.spyOn(JoyCon.prototype, 'resolve').mockResolvedValue('/root/contracts.config.ts');
    jest.clearAllMocks();
  });

  it('Load config with contracts and fix paths', async () => {
    const { bundleRequire } = jest.requireMock('bundle-require');
    bundleRequire.mockResolvedValue({
      mod: {
        default: {
          contracts: ['./foo', './bar'],
          output: './types',
        },
      },
    });
    const loadedConfig = await loadConfig('/root');
    expect(loadedConfig).toEqual({
      basePath: '/root',
      contracts: ['/root/foo', '/root/bar'],
      output: '/root/types',
    });
  });

  it('Load config with workspace should fill contracts and fix paths', async () => {
    // Mock forc workspace file
    forcFiles.set('/root/workspace/Forc.toml', {
      workspace: {
        members: ['./foo', './bar'],
      },
    } as any);
    const { bundleRequire } = jest.requireMock('bundle-require');
    bundleRequire.mockResolvedValue({
      mod: {
        default: {
          workspace: './workspace',
          output: './types',
        },
      },
    });
    const loadedConfig = await loadConfig('/root');
    expect(loadedConfig).toEqual({
      basePath: '/root',
      workspace: '/root/workspace',
      contracts: ['/root/workspace/foo', '/root/workspace/bar'],
      output: '/root/types',
    });
  });
});
