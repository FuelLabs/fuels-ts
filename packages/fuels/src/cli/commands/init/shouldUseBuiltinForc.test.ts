import * as getSystemFuelCoreMod from '@fuel-ts/versions/cli';

import { mockLogger } from '../../../../test/utils/mockLogger';

import { shouldUseBuiltinFuelCore } from './shouldUseBuiltinFuelCore';

vi.mock('prompts', async () => {
  const mod = await vi.importActual('prompts');
  return {
    __esModule: true,
    ...mod,
  };
});

/**
 * @group node
 */
describe('shouldUseBuiltinFuelCore', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  function mockAll(returns: { getSystemFuelCore: string | null }) {
    const getSystemFuelCore = vi
      .spyOn(getSystemFuelCoreMod, 'getSystemFuelCore')
      .mockResolvedValue({ error: null, systemFuelCoreVersion: returns.getSystemFuelCore });

    const { error } = mockLogger();

    return {
      getSystemFuelCore,
      error,
    };
  }

  it('should select [built-in] fuel-core', async () => {
    const { getSystemFuelCore, error } = mockAll({ getSystemFuelCore: null });

    const useBuiltinFuelCore = await shouldUseBuiltinFuelCore();

    expect(useBuiltinFuelCore).toEqual(true);
    expect(getSystemFuelCore).toHaveBeenCalledTimes(1);

    expect(error).toHaveBeenCalledTimes(0);
  });

  it('should select [system] fuel-core', async () => {
    const { getSystemFuelCore, error } = mockAll({
      getSystemFuelCore: '1.0.0',
    });

    const useBuiltinFuelCore = await shouldUseBuiltinFuelCore();

    expect(useBuiltinFuelCore).toEqual(false);
    expect(getSystemFuelCore).toHaveBeenCalledTimes(1);

    expect(error).toHaveBeenCalledTimes(0);
  });
});
