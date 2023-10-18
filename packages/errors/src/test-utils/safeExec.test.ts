import { safeExec } from './safeExec';

/**
 * @group node
 */
describe('safeExec.js', () => {
  it('should catch error', async () => {
    const ERROR_MSG = 'I am an error.';

    const fn = () => {
      throw new Error(ERROR_MSG);
    };

    const { error, result } = await safeExec(fn);

    expect(result).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.message).toEqual(ERROR_MSG);
  });

  it('should execute function safely', async () => {
    const RETURNED_VALUE = 'I am the returned value.';

    const fn = () => RETURNED_VALUE;

    const { error, result } = await safeExec(fn);

    expect(error).toBeFalsy();
    expect(result).toEqual(RETURNED_VALUE);
  });
});
