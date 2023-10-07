import { safeExec } from '@fuel-ts/errors/test-utils';
import * as getSystemForcMod from '@fuel-ts/versions/cli';
import * as promptMod from 'prompts';

import * as loggerMod from '../../utils/logger';

import { makeErrorMessage, makeWarnMessage } from './messages';
import { shouldUseBuiltinForc } from './shouldUserBuiltinForc';

jest.mock('@fuel-ts/versions/cli', () => ({
  __esModule: true,
  ...jest.requireActual('@fuel-ts/versions/cli'),
}));

jest.mock('prompts', () => ({
  __esModule: true,
  ...jest.requireActual('prompts'),
}));

describe('shouldUseBuiltinForc', () => {
  beforeEach(jest.restoreAllMocks);

  function mockAll(returns: { getSystemForc: string | null; prompt: boolean }) {
    const getSystemForc = jest
      .spyOn(getSystemForcMod, 'getSystemForc')
      .mockReturnValue({ error: null, systemForcVersion: returns.getSystemForc });

    const prompt = jest
      .spyOn(promptMod, 'prompt')
      .mockReturnValue(Promise.resolve({ useBuiltinForc: returns.prompt }));

    const warn = jest.spyOn(loggerMod, 'warn').mockImplementation();
    const error = jest.spyOn(loggerMod, 'error').mockImplementation();

    return {
      getSystemForc,
      prompt,
      warn,
      error,
    };
  }

  it('should use system forc', async () => {
    expect(await shouldUseBuiltinForc(false)).toEqual(false);
  });

  it('should use built-in forc', async () => {
    expect(await shouldUseBuiltinForc(true)).toEqual(true);
  });

  it('should select [built-in] forc', async () => {
    const { getSystemForc, prompt, warn, error } = mockAll({
      getSystemForc: null,
      prompt: true,
    });

    const useBuiltinForc = await shouldUseBuiltinForc();

    expect(useBuiltinForc).toEqual(true);
    expect(getSystemForc).toHaveBeenCalledTimes(1);
    expect(prompt).toHaveBeenCalledTimes(1);

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toEqual(makeWarnMessage('forc'));
    expect(error).toHaveBeenCalledTimes(0);
  });

  it('should select [system] forc', async () => {
    const { getSystemForc, prompt, warn, error } = mockAll({
      getSystemForc: '1.0.0',
      prompt: true,
    });

    const useBuiltinForc = await shouldUseBuiltinForc();

    expect(useBuiltinForc).toEqual(false);
    expect(getSystemForc).toHaveBeenCalledTimes(1);

    expect(prompt).toHaveBeenCalledTimes(0);

    expect(warn).toHaveBeenCalledTimes(0);
    expect(error).toHaveBeenCalledTimes(0);
  });

  it('should error if nothing satisfies', async () => {
    const { getSystemForc, prompt, warn, error } = mockAll({
      getSystemForc: null,
      prompt: false,
    });

    const safe = await safeExec(() => shouldUseBuiltinForc());

    expect(safe.error).toBeTruthy();
    expect(safe.error?.toString()).toMatch(makeErrorMessage());
    expect(safe.result).not.toBeTruthy();

    expect(getSystemForc).toHaveBeenCalledTimes(1);
    expect(prompt).toHaveBeenCalledTimes(1);

    expect(warn).toHaveBeenCalledTimes(0);
    expect(error).toHaveBeenCalledTimes(1);
    expect(error.mock.calls[0][0]).toEqual(makeErrorMessage());
  });
});
