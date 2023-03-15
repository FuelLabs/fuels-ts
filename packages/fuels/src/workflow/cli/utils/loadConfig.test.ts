/* eslint-disable @typescript-eslint/no-explicit-any */
import JoyCon from 'joycon';

import { mockForcFiles } from '../../../../tests/mocks/mockForcFiles';
import { forcFiles, swayFiles, SwayType } from '../../services';

import { loadConfig } from './loadConfig';

jest.mock('bundle-require', () => ({
  bundleRequire: jest.fn(),
}));

describe('Bin Utils loadConfig', () => {
  beforeAll(() => {
    mockForcFiles();
  });

  beforeEach(() => {
    jest.spyOn(JoyCon.prototype, 'resolve').mockResolvedValue('/root/fuels.config.ts');
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
    forcFiles.set('/root/project/Forc.toml', {
      workspace: {
        members: ['./foo', './bar', './predicate', './script'],
      },
    } as any);
    // Mock swayFiles
    swayFiles.set('/root/project/foo/src/main.sw', SwayType.contract);
    swayFiles.set('/root/project/bar/src/main.sw', SwayType.contract);
    swayFiles.set('/root/project/predicate/src/main.sw', SwayType.predicate);
    swayFiles.set('/root/project/script/src/main.sw', SwayType.script);

    const { bundleRequire } = jest.requireMock('bundle-require');
    bundleRequire.mockResolvedValue({
      mod: {
        default: {
          workspace: './project',
          output: './types',
        },
      },
    });
    const loadedConfig = await loadConfig('/root');
    expect(loadedConfig).toEqual({
      basePath: '/root',
      workspace: '/root/project',
      contracts: ['/root/project/foo', '/root/project/bar'],
      predicates: ['/root/project/predicate'],
      scripts: ['/root/project/script'],
      output: '/root/types',
    });
  });
});
