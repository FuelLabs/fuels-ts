import * as getSystemFuelCoreMod from '@fuel-ts/versions/cli';

import { mockLogger } from '../../../../test/utils/mockLogger';

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

    const { error } = mockLogger();

    return {
      getSystemFuelCore,
      error,
    };
  }

  it('should select [built-in] fuel-core', () => {
    const { getSystemFuelCore, error } = mockAll({ getSystemFuelCore: null });

    const useBuiltinFuelCore = shouldUseBuiltinFuelCore();

    expect(useBuiltinFuelCore).toEqual(true);
    expect(getSystemFuelCore).toHaveBeenCalledTimes(1);

    expect(error).toHaveBeenCalledTimes(0);
  });

  it('should select [system] fuel-core', () => {
    const { getSystemFuelCore, error } = mockAll({
      getSystemFuelCore: '1.0.0',
    });

    const useBuiltinFuelCore = shouldUseBuiltinFuelCore();

    expect(useBuiltinFuelCore).toEqual(false);
    expect(getSystemFuelCore).toHaveBeenCalledTimes(1);

    expect(error).toHaveBeenCalledTimes(0);
  });
});
