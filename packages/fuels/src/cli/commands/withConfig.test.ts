import { program } from 'commander';

import { fuelsConfig } from '../../../test/fixtures/config/fuels.config';
import { mockLogger } from '../../../test/utils/mockLogger';
import { resetDiskAndMocks } from '../../../test/utils/resetDiskAndMocks';
import * as loadConfigMod from '../config/loadConfig';
import type { FuelsConfig } from '../types';
import { Commands } from '../types';

import { withConfig } from './withConfig';

describe('withConfig', () => {
  beforeEach(mockLogger);
  afterEach(resetDiskAndMocks);

  function mockAll(params?: { shouldErrorOnDeploy?: boolean; shouldErrorOnLoadConfig?: boolean }) {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();

    const copyConfig: FuelsConfig = {
      ...structuredClone(fuelsConfig),
      onSuccess,
      onFailure,
    };

    const configPath = '/a/real/path';

    const command = program
      .command(Commands.deploy)
      .option('-p, --path <path>', 'Path to project root', configPath);

    const loadConfig = jest.spyOn(loadConfigMod, 'loadConfig').mockImplementation((..._) => {
      if (params?.shouldErrorOnLoadConfig) {
        throw new Error('Something happened');
      }
      return Promise.resolve(copyConfig);
    });

    const deploy = jest.fn(() => {
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
      onSuccess,
      onFailure,
      error,
    };
  }

  test('onSuccess hook in config file', async () => {
    const { command, deploy, configPath, loadConfig, onSuccess, onFailure } = mockAll({
      shouldErrorOnDeploy: false,
    });

    await withConfig(command, Commands.deploy, deploy)();

    expect(loadConfig).toHaveBeenCalledTimes(1);
    expect(loadConfig.mock.calls[0][0]).toEqual(configPath);

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onSuccess.mock.calls[0][0]).toEqual({ data: [], type: 'deploy' });

    expect(onFailure).toHaveBeenCalledTimes(0);
  });

  test('onFailure hook in config file', async () => {
    const { command, deploy, error, loadConfig, configPath, onSuccess, onFailure } = mockAll({
      shouldErrorOnDeploy: true,
    });

    await withConfig(command, Commands.deploy, deploy)();

    expect(loadConfig).toHaveBeenCalledTimes(1);
    expect(loadConfig.mock.calls[0][0]).toEqual(configPath);

    expect(onSuccess).toHaveBeenCalledTimes(0);

    expect(error).toHaveBeenCalledTimes(1);
    expect(onFailure).toHaveBeenCalledTimes(1);
    expect(onFailure.mock.calls[0][0].toString()).toMatch(/something.+happened/i);
  });

  test('should handle error when loading config file', async () => {
    const { command, deploy, error, loadConfig, configPath, onSuccess } = mockAll({
      shouldErrorOnLoadConfig: true,
    });

    await withConfig(command, Commands.deploy, deploy)();

    expect(loadConfig).toHaveBeenCalledTimes(1);
    expect(loadConfig.mock.calls[0][0]).toEqual(configPath);

    expect(onSuccess).toHaveBeenCalledTimes(0);

    expect(error).toHaveBeenCalledTimes(1);
  });
});
