import * as getSystemFuelCoreMod from '@fuel-ts/versions/cli';

import { mockLogger } from '../../../../test/utils/mockLogger';

import { makeWarnMessage } from './messages';
import { shouldUseBuiltinFuelCore } from './shouldUseBuiltinFuelCore';

jest.mock('@fuel-ts/versions/cli', () => ({
  __esModule: true,
  ...jest.requireActual('@fuel-ts/versions/cli'),
}));

jest.mock('prompts', () => ({
  __esModule: true,
  ...jest.requireActual('prompts'),
}));

describe('shouldUseBuiltinFuelCore', () => {
  beforeEach(jest.restoreAllMocks);

  function mockAll(returns: { getSystemFuelCore: string | null }) {
    const getSystemFuelCore = jest
      .spyOn(getSystemFuelCoreMod, 'getSystemFuelCore')
      .mockReturnValue({ error: null, systemFuelCoreVersion: returns.getSystemFuelCore });

    const { warn, error } = mockLogger();

    return {
      getSystemFuelCore,
      warn,
      error,
    };
  }

  it('should select [built-in] fuel-core', () => {
    const { getSystemFuelCore, warn, error } = mockAll({ getSystemFuelCore: null });

    const useBuiltinFuelCore = shouldUseBuiltinFuelCore();

    expect(useBuiltinFuelCore).toEqual(true);
    expect(getSystemFuelCore).toHaveBeenCalledTimes(1);

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toEqual(makeWarnMessage('fuel-core'));
    expect(error).toHaveBeenCalledTimes(0);
  });

  it('should select [system] fuel-core', () => {
    const { getSystemFuelCore, warn, error } = mockAll({
      getSystemFuelCore: '1.0.0',
    });

    const useBuiltinFuelCore = shouldUseBuiltinFuelCore();

    expect(useBuiltinFuelCore).toEqual(false);
    expect(getSystemFuelCore).toHaveBeenCalledTimes(1);

    expect(warn).toHaveBeenCalledTimes(0);
    expect(error).toHaveBeenCalledTimes(0);
  });
});
