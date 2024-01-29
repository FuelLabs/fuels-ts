import { FuelError } from '../fuel-error';

import { expectToThrowFuelError } from './expect-to-throw-fuel-error';

/**
 * @group node
 * @group browser
 */
describe('expect-to-throw-fuel-error', () => {
  const otherError = new Error('Original Error');
  const fuelError = new FuelError(FuelError.CODES.PARSE_FAILED, 'FuelError 1');
  // @ts-expect-error creating invalid error with no `code`
  const fuelErrorCodeless: FuelError = { message: 'FuelError 2' };
  // @ts-expect-error Creating invalid error with invalid `code`
  const fuelErrorInvalid: FuelError = { code: 'xyz', message: 'FuelError 3' };

  const genericThrower = (error: Error) => () => {
    throw error;
  };

  const genericThrowerAsync = (error: Error) => async () => {
    const p = new Promise(genericThrower(error));
    return p;
  };

  const throwFuelError = genericThrower(fuelError);
  const throwFuelErrorAsync = genericThrowerAsync(fuelError);
  const throwFuelErrorInvalid = genericThrower(fuelErrorInvalid);
  const throwFuelErrorInvalidAsync = genericThrowerAsync(fuelErrorInvalid);
  const throwOtherError = genericThrower(otherError);
  const throwOtherErrorAsync = genericThrowerAsync(otherError);

  it(`fails when passed fn doesn't throw`, async () => {
    const fn = () => expectToThrowFuelError(() => {}, fuelError);
    const fnAsync = () => expectToThrowFuelError(async () => {}, fuelError);
    const m = `Passed-in lambda didn't throw.`;
    await expect(fn).rejects.toThrow(m);
    await expect(fnAsync).rejects.toThrow(m);
  });

  it('compares whole or partial error objects', async () => {
    const expected = { code: fuelError.code };
    await expectToThrowFuelError(throwFuelError, fuelError);
    await expectToThrowFuelError(throwFuelErrorAsync, fuelError);
    await expectToThrowFuelError(throwFuelError, expected);
    await expectToThrowFuelError(throwFuelErrorAsync, expected);
  });

  it(`fails if thrown error doesn't have a code`, async () => {
    const fn = () => expectToThrowFuelError(throwOtherError, fuelError);
    const fnAsync = () => expectToThrowFuelError(throwOtherErrorAsync, fuelError);
    const m = `Thrown error must contain a code.`;
    await expect(fn).rejects.toThrow(m);
    await expect(fnAsync).rejects.toThrow(m);
  });

  it(`fails if thrown error code is invalid`, async () => {
    const fn = () => expectToThrowFuelError(throwFuelErrorInvalid, fuelError);
    const fnAsync = () => expectToThrowFuelError(throwFuelErrorInvalidAsync, fuelError);
    const m = `Thrown error code '${fuelErrorInvalid.code}' is not a valid FuelError code.`;
    await expect(fn).rejects.toThrow(m);
    await expect(fnAsync).rejects.toThrow(m);
  });

  it(`fails if expected error doesn't have a code`, async () => {
    const fn = () => expectToThrowFuelError(throwFuelError, fuelErrorCodeless);
    const fnAsync = () => expectToThrowFuelError(throwFuelErrorAsync, fuelErrorCodeless);
    const m = `Expected error must contain a code.`;
    await expect(fn).rejects.toThrow(m);
    await expect(fnAsync).rejects.toThrow(m);
  });

  it(`fails if expected error code is invalid`, async () => {
    const fn = () => expectToThrowFuelError(throwFuelError, fuelErrorInvalid);
    const fnAsync = () => expectToThrowFuelError(throwFuelErrorAsync, fuelErrorInvalid);
    const m = `Expected error code '${fuelErrorInvalid.code}' is not a valid FuelError code.`;
    await expect(fn).rejects.toThrow(m);
    await expect(fnAsync).rejects.toThrow(m);
  });

  it(`contain information about original error`, async () => {
    const errFn = genericThrower(otherError);
    const fn = () => expectToThrowFuelError(errFn, fuelError);
    await expect(fn).rejects.toThrow('Thrown error >>> Error: Original Error');
  });
});
