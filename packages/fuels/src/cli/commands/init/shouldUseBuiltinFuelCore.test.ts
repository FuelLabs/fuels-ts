import * as getSystemForcMod from '@fuel-ts/versions/cli';

import { mockLogger } from '../../../../test/utils/mockLogger';

import { shouldUseBuiltinForc } from './shouldUseBuiltinForc';

jest.mock('@fuel-ts/versions/cli', () => ({
  __esModule: true,
  ...jest.requireActual('@fuel-ts/versions/cli'),
}));

describe('shouldUseBuiltinForc', () => {
  beforeEach(jest.restoreAllMocks);

  function mockAll(returns: { getSystemForc: string | null }) {
    const getSystemForc = jest
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
