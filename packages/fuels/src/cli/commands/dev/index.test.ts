import type { FSWatcher } from 'chokidar';

import { fuelsConfig } from '../../../../test/fixtures/fuels.config';
import { mockStartFuelCore } from '../../../../test/utils/mockAutoStartFuelCore';
import { mockLogger } from '../../../../test/utils/mockLogger';
import { safeExec } from '../../../test-utils';
import * as loadConfigMod from '../../config/loadConfig';
import type { FuelsConfig } from '../../types';
import * as buildMod from '../build';
import * as deployMod from '../deploy';
import * as withConfigMod from '../withConfig';

// import * as indexMod from './index';
import {
  closeAllFileHandlers,
  configFileChanged,
  dev,
  getConfigFilepathsToWatch,
  workspaceFileChanged,
} from '.';

/**
 * @group node
 */
describe('dev', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  function mockAll() {
    const { autoStartFuelCore, fuelCore, killChildProcess } = mockStartFuelCore();

    const onDev = vi.fn();
    const onFailure = vi.fn();

    const withConfigErrorHandler = vi
      .spyOn(withConfigMod, 'withConfigErrorHandler')
      .mockReturnValue(Promise.resolve());

    const loadConfig = vi
      .spyOn(loadConfigMod, 'loadConfig')
      .mockReturnValue(Promise.resolve(fuelsConfig));

    const build = vi.spyOn(buildMod, 'build').mockResolvedValue();
    const deploy = vi.spyOn(deployMod, 'deploy').mockResolvedValue({
      contracts: [],
      scripts: [],
      predicates: [],
    });

    return {
      autoStartFuelCore,
      build,
      deploy,
      fuelCore,
      killChildProcess,
      loadConfig,
      onDev,
      onFailure,
      withConfigErrorHandler,
    };
  }

  test('workspaceFileChanged should log change and call `buildAndDeploy`', async () => {
    const { log } = mockLogger();
    const { build, deploy } = mockAll();

    await workspaceFileChanged({ config: fuelsConfig, watchHandlers: [], filesBeingProcessed: [] })(
      'event',
      'some/path'
    );

    expect(log).toHaveBeenCalledTimes(1);
    expect(build).toHaveBeenCalledTimes(1);
    expect(deploy).toHaveBeenCalledTimes(1);
  });

  test('should call `onDev` callback on success', async () => {
    const { onDev } = mockAll();
    const config: FuelsConfig = { ...fuelsConfig, onDev };

    await dev(config);

    expect(onDev).toHaveBeenCalledWith(config);
  });

  it('dev should handle and log error from `buildAndDeploy`', async () => {
    const { error } = mockLogger();

    const err = new Error('something happened');
    vi.spyOn(buildMod, 'build').mockImplementation(() => {
      throw err;
    });

    const configCopy: FuelsConfig = { ...fuelsConfig, autoStartFuelCore: false };

    const { result, error: safeError } = await safeExec(() => dev(configCopy));

    expect(result).not.toBeTruthy();
    expect(safeError).toEqual(err);

    expect(error).toHaveBeenCalledTimes(1);
    expect(error.mock.calls[0][0]).toEqual(err);
  });

  test('should call `close` on all file handlers', () => {
    const close = vi.fn();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlers: any = [{ close }, { close }, { close }];

    closeAllFileHandlers(handlers);

    expect(close).toHaveBeenCalledTimes(3);
  });

  test('should restart everything when config file changes', async () => {
    const { log } = mockLogger();
    const {
      autoStartFuelCore,
      build,
      deploy,
      fuelCore,
      killChildProcess,
      loadConfig,
      withConfigErrorHandler,
    } = mockAll();

    const config = structuredClone(fuelsConfig);
    const close = vi.fn();
    const watchHandlers = [{ close }, { close }] as unknown as FSWatcher[];

    await configFileChanged({ config, fuelCore, watchHandlers, filesBeingProcessed: [] })(
      'event',
      'some/path'
    );

    // configFileChanged() internals
    expect(log).toHaveBeenCalledTimes(1);
    expect(close).toHaveBeenCalledTimes(2);
    expect(killChildProcess).toHaveBeenCalledTimes(1);
    expect(loadConfig).toHaveBeenCalledTimes(1);

    // dev() internals
    expect(autoStartFuelCore).toHaveBeenCalledTimes(1);
    expect(build).toHaveBeenCalledTimes(1);
    expect(deploy).toHaveBeenCalledTimes(1);
    expect(withConfigErrorHandler).toHaveBeenCalledTimes(0); // never error
  });

  test('should restart everything and handle errors', async () => {
    const { log } = mockLogger();
    const {
      autoStartFuelCore,
      deploy,
      fuelCore,
      killChildProcess,
      loadConfig,
      onFailure,
      withConfigErrorHandler,
    } = mockAll();

    const err = new Error('something happened');
    const build = vi.spyOn(buildMod, 'build').mockImplementation(() => {
      throw err;
    });

    const config = { onFailure, ...structuredClone(fuelsConfig) };
    const close = vi.fn();
    const watchHandlers = [{ close }, { close }] as unknown as FSWatcher[];

    await configFileChanged({ config, fuelCore, watchHandlers, filesBeingProcessed: [] })(
      'event',
      'some/path'
    );

    // configFileChanged() internals
    expect(log).toHaveBeenCalledTimes(1);
    expect(close).toHaveBeenCalledTimes(2);
    expect(killChildProcess).toHaveBeenCalledTimes(1);
    expect(loadConfig).toHaveBeenCalledTimes(1);

    // dev() internals
    expect(autoStartFuelCore).toHaveBeenCalledTimes(1);
    expect(build).toHaveBeenCalledTimes(1);
    expect(deploy).toHaveBeenCalledTimes(0); // never deploy
    expect(withConfigErrorHandler).toHaveBeenCalledTimes(1);
  });

  test('should collect only non-null config paths', () => {
    const config: FuelsConfig = structuredClone(fuelsConfig);

    config.snapshotDir = undefined;
    expect(getConfigFilepathsToWatch(config)).toHaveLength(1);

    config.snapshotDir = '/some/path/to/chainConfig.json';
    expect(getConfigFilepathsToWatch(config)).toHaveLength(2);
  });
});
