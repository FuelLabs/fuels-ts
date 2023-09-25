import { fuelsConfig } from '../../../../tests/fixtures/fuels-config';
import type { FuelsConfig } from '../../types';

import { buildSwayPrograms } from './buildSwayPrograms';

// jest.mock('../services', () => {
//   const original = jest.requireActual('../services');
//   return {
//     ...original,
//     forcBuild: jest.fn(),
//   };
// });

// jest.mock('../utils', () => {
//   const original = jest.requireActual('../utils');
//   return {
//     ...original,
//     logSection: jest.fn(),
//   };
// });

describe.skip('Deploy Action', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('build action should call forcBuild with workspace config', async () => {
    const config: FuelsConfig = {
      ...fuelsConfig,
      basePath: '/root',
      workspace: '/root/project',
      contracts: [],
      predicates: [],
      scripts: [],
      output: '/types',
    };

    await buildSwayPrograms(config);

    const services = jest.requireMock('../services');
    const utils = jest.requireMock('../utils');
    expect(utils.logSection).toHaveBeenCalledWith('🧰 Building...');
    expect(services.forcBuild).toHaveBeenCalledWith(config, '/root/project');
  });

  it('build action should call forcBuild with contracts config', async () => {
    const config: FuelsConfig = {
      ...fuelsConfig,
      basePath: '/root',
      contracts: ['/root/project/foo', '/root/project/bar'],
      predicates: ['/root/project/predicate'],
      scripts: ['/root/project/script'],
      output: '/types',
    };
    await buildSwayPrograms(config);
    const services = jest.requireMock('../services');
    const utils = jest.requireMock('../utils');
    expect(utils.logSection).toHaveBeenCalledWith('🧰 Building...');
    expect(services.forcBuild).toHaveBeenCalledWith(config, '/root/project/foo');
    expect(services.forcBuild).toHaveBeenCalledWith(config, '/root/project/bar');
  });
});
