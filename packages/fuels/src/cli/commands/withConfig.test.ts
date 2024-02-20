import { safeExec } from '@fuel-ts/errors/test-utils';
import { program } from 'commander';

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
    const onSuccess = vi.fn();
    const onFailure = vi.fn();

    const copyConfig: FuelsConfig = {
      ...structuredClone(fuelsConfig),
      onSuccess,
      onFailure,
    };

    const configPath = '/a/real/path';

    const command = program
      .command(Commands.deploy)
      .option('-p, --path <path>', 'Path to project root', configPath);

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

    const { error: cmdError, result: cmdResult } = await safeExec(async () => {
      await withConfig(command, Commands.deploy, deploy)();
    });

    expect(cmdError).toBeTruthy();
    expect(cmdResult).toBeFalsy();

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

    const { error: cmdError, result: cmdResult } = await safeExec(async () => {
      await withConfig(command, Commands.deploy, deploy)();
    });

    expect(cmdError).toBeTruthy();
    expect(cmdResult).toBeFalsy();

    expect(loadConfig).toHaveBeenCalledTimes(1);
    expect(loadConfig.mock.calls[0][0]).toEqual(configPath);

    expect(onSuccess).toHaveBeenCalledTimes(0);

    expect(error).toHaveBeenCalledTimes(1);
  });
});
