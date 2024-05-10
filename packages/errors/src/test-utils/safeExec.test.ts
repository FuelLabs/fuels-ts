import { safeExec } from './safeExec';

/**
 * @group node
 * @group browser
 */
describe('safeExec.js', () => {
  it('should catch error', async () => {
    const errorMsg = 'I am an error.';

    const fn = () => {
      throw new Error(errorMsg);
    };

    const { error, result } = await safeExec(fn);

    expect(result).toBeFalsy();
    expect(error).toBeTruthy();
    expect(error?.message).toEqual(errorMsg);
  });

  it('should execute function safely', async () => {
    const returnedValue = 'I am the returned value.';

    const fn = () => returnedValue;

    const { error, result } = await safeExec(fn);

    expect(error).toBeFalsy();
    expect(result).toEqual(returnedValue);
  });
});
