import * as getSystemForcMod from '@fuel-ts/versions/cli';

import { mockLogger } from '../../../../test/utils/mockLogger';

import { shouldUseBuiltinForc } from './shouldUseBuiltinForc';

vi.mock('@fuel-ts/versions/cli', async () => {
  const mod = await vi.importActual('@fuel-ts/versions/cli');
  return {
    __esModule: true,
    ...mod,
  };
});

/**
 * @group node
 */
describe('shouldUseBuiltinForc', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  function mockAll(returns: { getSystemForc: string | null }) {
    const getSystemForc = vi
      .spyOn(getSystemForcMod, 'getSystemForc')
      .mockReturnValue({ error: null, systemForcVersion: returns.getSystemForc });

    const { error } = mockLogger();

    return {
      getSystemForc,
      error,
    };
  }

  it('should select [built-in] forc', () => {
    const { getSystemForc, error } = mockAll({ getSystemForc: null });

    const useBuiltinForc = shouldUseBuiltinForc();

    expect(useBuiltinForc).toEqual(true);
    expect(getSystemForc).toHaveBeenCalledTimes(1);

    expect(error).toHaveBeenCalledTimes(0);
  });

  it('should select [system] forc', () => {
    const { getSystemForc, error } = mockAll({ getSystemForc: '1.0.0' });

    const useBuiltinForc = shouldUseBuiltinForc();

    expect(useBuiltinForc).toEqual(false);
    expect(getSystemForc).toHaveBeenCalledTimes(1);

    expect(error).toHaveBeenCalledTimes(0);
  });
});
