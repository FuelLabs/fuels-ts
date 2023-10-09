import { safeExec } from '@fuel-ts/errors/test-utils';
import { program } from 'commander';

import { fuelsConfig } from '../../../test/fixtures/config/fuels.config';
import { clean } from '../../../test/utils/runCommands';
import * as loadConfigMod from '../config/loadConfig';
import type { FuelsConfig } from '../types';
import { Commands } from '../types';
import { loggingConfig, configureLogging } from '../utils/logger';

import { withConfig } from './withConfig';

describe('withConfig', () => {
  const loggingBackup = structuredClone(loggingConfig);

  beforeEach(() => {
    jest.restoreAllMocks();
    configureLogging({ isLoggingEnabled: false, isDebugEnabled: false });
    clean();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    configureLogging(loggingBackup);
    clean();
  });

  function mockAll(params: { shouldError: boolean }) {
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

    const loadConfig = jest
      .spyOn(loadConfigMod, 'loadConfig')
      .mockImplementation((..._) => Promise.resolve(copyConfig));

    const deploy = jest.fn(() => {
      if (params.shouldError) {
        throw new Error('Something happened');
      }
      return Promise.resolve([]);
    });

    return {
      configPath,
      command,
      deploy,
      loadConfig,
      onSuccess,
      onFailure,
    };
  }

  test('onSuccess hook in config file', async () => {
    const { command, deploy, configPath, loadConfig, onSuccess, onFailure } = mockAll({
      shouldError: false,
    });

    await withConfig(command, Commands.deploy, deploy)();

    expect(loadConfig).toHaveBeenCalledTimes(1);
    expect(loadConfig.mock.calls[0][0]).toEqual(configPath);

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onSuccess.mock.calls[0][0]).toEqual({ data: [], type: 'deploy' });

    expect(onFailure).toHaveBeenCalledTimes(0);
  });

  test('onFailure hook in config file', async () => {
    const { command, deploy, loadConfig, configPath, onSuccess, onFailure } = mockAll({
      shouldError: true,
    });

    const { error, result } = await safeExec(async () =>
      withConfig(command, Commands.deploy, deploy)()
    );

    expect(result).not.toBeTruthy();
    expect(error).toBeTruthy();

    expect(loadConfig).toHaveBeenCalledTimes(1);
    expect(loadConfig.mock.calls[0][0]).toEqual(configPath);

    expect(onSuccess).toHaveBeenCalledTimes(0);

    expect(onFailure).toHaveBeenCalledTimes(1);
    expect(onFailure.mock.calls[0][0].toString()).toMatch(/something.+happened/i);
  });
});
