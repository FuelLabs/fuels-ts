import { safeExec } from '@fuel-ts/utils/test-utils';

import type { FuelError } from '../index';
import { ErrorCode } from '../index';

type ExpectedFuelError = Partial<FuelError> & Required<Pick<FuelError, 'code'>>;

export const expectToThrowFuelError = async (
  lambda: () => unknown,
  expectedError: ExpectedFuelError
) => {
  const { error: thrownError } = await safeExec<unknown, FuelError>(lambda);
  const codes = Object.values(ErrorCode);

  if (!thrownError) {
    throw new Error("Passed-in lambda didn't throw.");
  }

  if (!thrownError.code) {
    throw new Error('Thrown error must contain a code.');
  }

  if (!expectedError.code) {
    throw new Error('Expected error must contain a code.');
  }

  if (!codes.includes(thrownError.code)) {
    throw new Error(`Thrown error code '${thrownError.code}' is not a valid FuelError code.`);
  }

  if (!codes.includes(expectedError.code)) {
    throw new Error(`Expected error code '${expectedError.code}' is not a valid FuelError code.`);
  }

  expect(thrownError.name).toEqual('FuelError');
  expect(thrownError).toMatchObject(expectedError);
};
