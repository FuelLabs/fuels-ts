import { safeExec } from '@fuel-ts/utils/test-utils';

import { ErrorCode, type FuelError } from '../index';

const errorCodes = Object.values(ErrorCode);

export const expectToThrowFuelError = async (
  lambda: () => unknown,
  expectedError: FuelError | (Partial<FuelError> & Required<Pick<FuelError, 'code'>>)
) => {
  const { error } = await safeExec<unknown, FuelError>(lambda);

  if (!error) {
    throw new Error("Passed-in lambda didn't throw.");
  }

  if (!expectedError.code) {
    throw new Error('Expected error must contain a code.');
  }

  if (!errorCodes.includes(error.code)) {
    throw new Error('Thrown error code is not a valid FuelError code.');
  }

  if (!errorCodes.includes(expectedError.code)) {
    throw new Error('Expected error code is not a valid FuelError code.');
  }

  expect(error.code).toEqual(expectedError.code);
  expect(error?.name).toEqual('FuelError');

  if (expectedError.message) {
    expect(error.message).toEqual(expectedError.message);
  }
};
