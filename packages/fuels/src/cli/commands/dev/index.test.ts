import { safeExec } from '@fuel-ts/errors/test-utils';

import { fuelsConfig } from '../../../../test/fixtures/config/fuels.config';
import { mockLogger } from '../../../../test/utils/mockLogger';
import * as loadConfigMod from '../../config/loadConfig';
import type { FuelsConfig } from '../../types';
import * as withConfigMod from '../withConfig';

import * as indexMod from '.';
import type { FuelCoreNode } from './startFuelCore';

describe('dev', () => {
  beforeEach(jest.restoreAllMocks);

  function mockAll() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const killChildProcess: any = jest.fn();
    const closeAllFileHandlers = jest.spyOn(indexMod, 'closeAllFileHandlers').mockImplementation();
    const fuelCore = { killChildProcess } as FuelCoreNode;
    const onFailure = jest.fn();

    const withConfigErrorHandler = jest
      .spyOn(withConfigMod, 'withConfigErrorHandler')
      .mockImplementation();

    const loadConfig = jest
      .spyOn(loadConfigMod, 'loadConfig')
      .mockReturnValue(Promise.resolve(fuelsConfig));

    const dev = jest.spyOn(indexMod, 'dev').mockImplementation(() => {
      throw new Error('The sky became purple');
    });

    return {
      closeAllFileHandlers,
      dev,
      fuelCore,
      killChildProcess,
      loadConfig,
      onFailure,
      withConfigErrorHandler,
    };
  }

  const { workspaceFileChanged } = indexMod;

  test('workspaceFileChanged should log change and call `buildAndDeploy`', async () => {
    const { log } = mockLogger();

    const buildAndDeploy = jest.spyOn(indexMod, 'buildAndDeploy').mockImplementation();

    await workspaceFileChanged({ config: fuelsConfig, watchHandlers: [] })('some/path');

    expect(log).toHaveBeenCalledTimes(1);
    expect(buildAndDeploy).toHaveBeenCalledTimes(1);
  });

  test('dev should handle and log error from `buildAndDeploy`', async () => {
    const err = new Error('something happened');

    const { error } = mockLogger();

    jest.spyOn(indexMod, 'buildAndDeploy').mockImplementation(() => {
      throw err;
    });

    const configCopy: FuelsConfig = { ...fuelsConfig, autoStartFuelCore: false };

    const { result, error: safeError } = await safeExec(() => indexMod.dev(configCopy));

    expect(result).not.toBeTruthy();
    expect(safeError).toEqual(err);

    expect(error).toHaveBeenCalledTimes(1);
    expect(error.mock.calls[0][0]).toEqual(err);
  });

  test('should call `close` on all file handlers', () => {
    const close = jest.fn();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlers: any = [{ close }, { close }, { close }];

    indexMod.closeAllFileHandlers(handlers);

    expect(close).toHaveBeenCalledTimes(3);
  });

  test('should restart everything when config file changes', async () => {
    const { closeAllFileHandlers, dev, fuelCore, killChildProcess, loadConfig } = mockAll();
    const { log } = mockLogger();

    const config = structuredClone(fuelsConfig);

    await indexMod.configFileChanged({ config, fuelCore, watchHandlers: [] })('some/path');

    expect(closeAllFileHandlers).toHaveBeenCalledTimes(1);
    expect(killChildProcess).toHaveBeenCalledTimes(1);
    expect(dev).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledTimes(1);
    expect(loadConfig).toHaveBeenCalledTimes(1);
  });

  test('should restart everything and handle errors', async () => {
    const {
      closeAllFileHandlers,
      dev,
      fuelCore,
      killChildProcess,
      loadConfig,
      onFailure,
      withConfigErrorHandler,
    } = mockAll();

    const { log } = mockLogger();

    const config = { onFailure, ...structuredClone(fuelsConfig) };

    await indexMod.configFileChanged({ config, fuelCore, watchHandlers: [] })('some/path');

    expect(log).toHaveBeenCalledTimes(1);

    expect(closeAllFileHandlers).toHaveBeenCalledTimes(1);
    expect(killChildProcess).toHaveBeenCalledTimes(1);

    expect(loadConfig).toHaveBeenCalledTimes(1);
    expect(dev).toHaveBeenCalledTimes(1);

    expect(withConfigErrorHandler).toHaveBeenCalledTimes(1);
  });

  test('should collect only non-null config paths', () => {
    const config = structuredClone(fuelsConfig);

    config.chainConfig = undefined;
    expect(indexMod.getConfigFilepathsToWatch(config)).toHaveLength(1);

    config.chainConfig = '/some/path/to/chainConfig.json';
    expect(indexMod.getConfigFilepathsToWatch(config)).toHaveLength(2);
  });
});
