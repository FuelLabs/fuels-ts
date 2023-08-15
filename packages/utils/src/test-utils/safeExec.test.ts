import { safeExec, safeExecAsync } from './safeExec';

describe('safeExec.js', () => {
  it('should catch error (sync)', () => {
    const ERROR_MSG = 'I am a SYNC error.';

    const fn = () => {
      throw new Error(ERROR_MSG);
    };

    const { error, result } = safeExec(fn);

    expect(result).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.message).toEqual(ERROR_MSG);
  });

  it('should catch error (async)', async () => {
    const ERROR_MSG = 'I am an ASYNC error.';

    const fn = async () => {
      await Promise.resolve(true);
      throw new Error(ERROR_MSG);
    };

    const { error, result } = await safeExecAsync(fn);

    expect(result).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.message).toEqual(ERROR_MSG);
  });

  it('should execute function safely (sync)', async () => {
    const RETURNED_VALUE = 'I am the returned value.';

    const fn = () => RETURNED_VALUE;

    const { error, result } = safeExec(fn);

    expect(error).toBeFalsy();
    expect(result).toEqual(RETURNED_VALUE);
  });

  it('should execute function safely (async)', async () => {
    const RETURNED_VALUE = 'I am the returned value.';

    const fn = async () => Promise.resolve(RETURNED_VALUE);

    const { error, result } = await safeExecAsync(fn);

    expect(error).toBeFalsy();
    expect(result).toEqual(RETURNED_VALUE);
  });
});
