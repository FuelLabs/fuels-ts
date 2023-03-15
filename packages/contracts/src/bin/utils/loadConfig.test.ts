/* eslint-disable @typescript-eslint/no-explicit-any */
import JoyCon from 'joycon';

import { forcFiles, swayFiles, SwayType } from '../../services';

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
          predicates: ['./predicate'],
          scripts: ['./script'],
          output: './types',
        },
      },
    });
    const loadedConfig = await loadConfig('/root');
    expect(loadedConfig).toEqual({
      basePath: '/root',
      contracts: ['/root/foo', '/root/bar'],
      predicates: ['/root/predicate'],
      scripts: ['/root/script'],
      output: '/root/types',
    });
  });

  it('Load config with workspace should fill contracts and fix paths', async () => {
    // Mock forc workspace file
    forcFiles.set('/root/workspace/Forc.toml', {
      workspace: {
        members: ['./foo', './bar', './predicate', './script'],
      },
    } as any);
    // Mock swayFiles
    swayFiles.set('/root/workspace/foo/src/main.sw', SwayType.contract);
    swayFiles.set('/root/workspace/bar/src/main.sw', SwayType.contract);
    swayFiles.set('/root/workspace/predicate/src/main.sw', SwayType.predicate);
    swayFiles.set('/root/workspace/script/src/main.sw', SwayType.script);

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
      predicates: ['/root/workspace/predicate'],
      scripts: ['/root/workspace/script'],
      output: '/root/types',
    });
  });
});
