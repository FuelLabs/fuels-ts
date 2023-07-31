import { FuelError } from '..';

import { expectToThrowFuelError } from './expect-to-throw-fuel-error';


describe('FuelError', () => {
  it('shold compare whole or partial error objects', () => {
    const error = new FuelError(FuelError.CODES.PARSE_FAILED, 'asdf')
    expectToThrowFuelError(() => {throw error}, error)
    expectToThrowFuelError(() => {throw error}, { code: FuelError.CODES.PARSE_FAILED })
  });
});
