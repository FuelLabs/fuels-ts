import { Command } from 'commander';

import { fuelsConfig } from '../../../test/fixtures/fuels.config';
import { mockLogger } from '../../../test/utils/mockLogger';
import * as loadConfigMod from '../config/loadConfig';
import type { FuelsConfig } from '../types';
import { Commands } from '../types';

import { withConfig } from './withConfig';

/**
 * @group node
 */
describe('withConfig', () => {
  beforeEach(() => {
    mockLogger();
  });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  function mockAll(params?: { shouldErrorOnDeploy?: boolean; shouldErrorOnLoadConfig?: boolean }) {
    const onFailure = vi.fn();

    const copyConfig: FuelsConfig = {
      ...structuredClone(fuelsConfig),
      onFailure,
    };

    const configPath = '/a/real/path';

    const command = new Command()
      .command(Commands.deploy)
      .option('--path <path>', 'Path to project root', configPath);

    const loadConfig = vi.spyOn(loadConfigMod, 'loadConfig').mockImplementation(() => {
      if (params?.shouldErrorOnLoadConfig) {
        throw new Error('Something happened');
      }
      return Promise.resolve(copyConfig);
    });

    const deploy = vi.fn(() => {
      if (params?.shouldErrorOnDeploy) {
        throw new Error('Something happened');
      }
      return Promise.resolve([]);
    });

    const { error } = mockLogger();

    return {
      configPath,
      command,
      deploy,
      loadConfig,
      onFailure,
      error,
    };
  }

  test('onFailure hook in config file', async () => {
    const { command, deploy, error, loadConfig, configPath, onFailure } = mockAll({
      shouldErrorOnDeploy: true,
    });

    await withConfig(command, Commands.deploy, deploy)();

    expect(loadConfig).toHaveBeenCalledTimes(1);
    expect(loadConfig.mock.calls[0][0]).toEqual(configPath);

    expect(error).toHaveBeenCalledTimes(1);
    expect(onFailure).toHaveBeenCalledTimes(1);
    expect(onFailure.mock.calls[0][1].toString()).toMatch(/something.+happened/i);
  });

  test('should handle error when loading config file', async () => {
    const { command, deploy, error, loadConfig, configPath } = mockAll({
      shouldErrorOnLoadConfig: true,
    });

    await withConfig(command, Commands.deploy, deploy)();

    expect(loadConfig).toHaveBeenCalledTimes(1);
    expect(loadConfig.mock.calls[0][0]).toEqual(configPath);

    expect(error).toHaveBeenCalledTimes(1);
  });
});
