import { FuelError } from '..';

import { expectToThrowFuelError } from './expect-to-throw-fuel-error';


describe('FuelError', () => {
  it('should compare whole or partial error objects', () => {
    const error = new FuelError(FuelError.CODES.PARSE_FAILED, 'It happens')
    expectToThrowFuelError(() => {throw error}, error)
    expectToThrowFuelError(() => {throw error}, { code: FuelError.CODES.PARSE_FAILED })
  });
});
