import { safeExec } from '@fuel-ts/errors/test-utils';
import * as getSystemFuelCoreMod from '@fuel-ts/versions/cli';
import * as promptMod from 'prompts';

import * as loggerMod from '../../utils/logger';

import { makeErrorMessage, makeWarnMessage } from './messages';
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

  function mockAll(returns: { getSystemFuelCore: string | null; prompt: boolean }) {
    const getSystemFuelCore = jest
      .spyOn(getSystemFuelCoreMod, 'getSystemFuelCore')
      .mockReturnValue({ error: null, systemFuelCoreVersion: returns.getSystemFuelCore });

    const prompt = jest
      .spyOn(promptMod, 'prompt')
      .mockReturnValue(Promise.resolve({ useBuiltinFuelCore: returns.prompt }));

    const warn = jest.spyOn(loggerMod, 'warn').mockImplementation();
    const error = jest.spyOn(loggerMod, 'error').mockImplementation();

    return {
      getSystemFuelCore,
      prompt,
      warn,
      error,
    };
  }

  it('should use system fuel-core', async () => {
    expect(await shouldUseBuiltinFuelCore(false)).toEqual(false);
  });

  it('should use built-in fuel-core', async () => {
    expect(await shouldUseBuiltinFuelCore(true)).toEqual(true);
  });

  it('should select [built-in] fuel-core', async () => {
    const { getSystemFuelCore, prompt, warn, error } = mockAll({
      getSystemFuelCore: null,
      prompt: true,
    });

    const useBuiltinFuelCore = await shouldUseBuiltinFuelCore();

    expect(useBuiltinFuelCore).toEqual(true);
    expect(getSystemFuelCore).toHaveBeenCalledTimes(1);
    expect(prompt).toHaveBeenCalledTimes(1);

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toEqual(makeWarnMessage('fuel-core'));
    expect(error).toHaveBeenCalledTimes(0);
  });

  it('should select [system] fuel-core', async () => {
    const { getSystemFuelCore, prompt, warn, error } = mockAll({
      getSystemFuelCore: '1.0.0',
      prompt: true,
    });

    const useBuiltinFuelCore = await shouldUseBuiltinFuelCore();

    expect(useBuiltinFuelCore).toEqual(false);
    expect(getSystemFuelCore).toHaveBeenCalledTimes(1);

    expect(prompt).toHaveBeenCalledTimes(0);

    expect(warn).toHaveBeenCalledTimes(0);
    expect(error).toHaveBeenCalledTimes(0);
  });

  it('should error if nothing satisfies', async () => {
    const { getSystemFuelCore, prompt, warn, error } = mockAll({
      getSystemFuelCore: null,
      prompt: false,
    });

    const safe = await safeExec(() => shouldUseBuiltinFuelCore());

    expect(safe.error).toBeTruthy();
    expect(safe.error?.toString()).toMatch(makeErrorMessage());
    expect(safe.result).not.toBeTruthy();

    expect(getSystemFuelCore).toHaveBeenCalledTimes(1);
    expect(prompt).toHaveBeenCalledTimes(1);

    expect(warn).toHaveBeenCalledTimes(0);
    expect(error).toHaveBeenCalledTimes(1);
    expect(error.mock.calls[0][0]).toEqual(makeErrorMessage());
  });
});
