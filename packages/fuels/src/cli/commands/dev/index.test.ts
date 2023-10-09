import { safeExec } from '@fuel-ts/errors/test-utils';

import { fuelsConfig } from '../../../../test/fixtures/config/fuels.config';
import type { FuelsConfig } from '../../types';
import * as logger from '../../utils/logger';

import * as indexMod from '.';

describe('dev', () => {
  const { dev, changeListener } = indexMod;

  test('changeListener should log change and call `buildAndDeploy`', async () => {
    const log = jest.spyOn(logger, 'log').mockImplementation();
    const buildAndDeploy = jest.spyOn(indexMod, 'buildAndDeploy').mockImplementation();

    await changeListener(fuelsConfig)('some/path');

    expect(log).toHaveBeenCalledTimes(1);
    expect(buildAndDeploy).toHaveBeenCalledTimes(1);
  });

  test('dev should handle and log error from `buildAndDeploy`', async () => {
    const err = new Error('something happened');

    const error = jest.spyOn(logger, 'error').mockImplementation();

    jest.spyOn(indexMod, 'buildAndDeploy').mockImplementation(() => {
      throw err;
    });

    const configCopy: FuelsConfig = { ...fuelsConfig, autoStartFuelCore: false };

    const { result, error: safeError } = await safeExec(() => dev(configCopy));

    expect(result).not.toBeTruthy();
    expect(safeError).toEqual(err);

    expect(error).toHaveBeenCalledTimes(1);
    expect(error.mock.calls[0][0]).toEqual(err);
  });
});
