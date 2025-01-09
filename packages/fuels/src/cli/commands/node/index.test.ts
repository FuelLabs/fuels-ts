import type { FSWatcher } from 'chokidar';

import { fuelsConfig } from '../../../../test/fixtures/fuels.config';
import { mockStartFuelCore } from '../../../../test/utils/mockAutoStartFuelCore';
import { mockLogger } from '../../../../test/utils/mockLogger';
import * as loadConfigMod from '../../config/loadConfig';
import type { FuelsConfig } from '../../types';
import * as withConfigMod from '../withConfig';

import { closeAllFileHandlers, configFileChanged, getConfigFilepathsToWatch } from '.';

/**
 * @group node
 */
describe('node', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  function mockAll() {
    const { autoStartFuelCore, fuelCore, killChildProcess } = mockStartFuelCore();

    const onNode = vi.fn();
    const onFailure = vi.fn();

    const withConfigErrorHandler = vi
      .spyOn(withConfigMod, 'withConfigErrorHandler')
      .mockReturnValue(Promise.resolve());

    const loadConfig = vi
      .spyOn(loadConfigMod, 'loadConfig')
      .mockReturnValue(Promise.resolve(fuelsConfig));

    return {
      autoStartFuelCore,
      fuelCore,
      killChildProcess,
      loadConfig,
      onNode,
      onFailure,
      withConfigErrorHandler,
    };
  }

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
      fuelCore,
      killChildProcess,
      loadConfig,
      withConfigErrorHandler,
      onNode,
    } = mockAll();

    const config = { ...fuelsConfig, onNode };
    const close = vi.fn();
    const watchHandlers = [{ close }, { close }] as unknown as FSWatcher[];

    await configFileChanged({ config, fuelCore, watchHandlers })('event', 'some/path');

    // configFileChanged() internals
    expect(onNode).toHaveBeenCalledWith(config);
    expect(log).toHaveBeenCalledTimes(1);
    expect(close).toHaveBeenCalledTimes(2);
    expect(killChildProcess).toHaveBeenCalledTimes(1);
    expect(loadConfig).toHaveBeenCalledTimes(1);

    // node() internals
    expect(autoStartFuelCore).toHaveBeenCalledTimes(1);
    expect(withConfigErrorHandler).toHaveBeenCalledTimes(0); // never error
  });

  test('should collect only non-null config paths', () => {
    const config: FuelsConfig = structuredClone(fuelsConfig);

    config.snapshotDir = undefined;
    expect(getConfigFilepathsToWatch(config)).toHaveLength(1);

    config.snapshotDir = '/some/path/to/chainConfig.json';
    expect(getConfigFilepathsToWatch(config)).toHaveLength(2);
  });
});
