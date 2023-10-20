import * as getSystemForcMod from '@fuel-ts/versions/cli';

import { mockLogger } from '../../../../test/utils/mockLogger';

import { makeWarnMessage } from './messages';
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

    const { warn, error } = mockLogger();

    return {
      getSystemForc,
      warn,
      error,
    };
  }

  it('should select [built-in] forc', () => {
    const { getSystemForc, warn, error } = mockAll({ getSystemForc: null });

    const useBuiltinForc = shouldUseBuiltinForc();

    expect(useBuiltinForc).toEqual(true);
    expect(getSystemForc).toHaveBeenCalledTimes(1);

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toEqual(makeWarnMessage('forc'));
    expect(error).toHaveBeenCalledTimes(0);
  });

  it('should select [system] forc', () => {
    const { getSystemForc, warn, error } = mockAll({ getSystemForc: '1.0.0' });

    const useBuiltinForc = shouldUseBuiltinForc();

    expect(useBuiltinForc).toEqual(false);
    expect(getSystemForc).toHaveBeenCalledTimes(1);

    expect(warn).toHaveBeenCalledTimes(0);
    expect(error).toHaveBeenCalledTimes(0);
  });
});
