import { safeExec, safeExecAsync } from '@fuel-ts/utils/test-utils';

import type { FuelError } from '../index';
import { ErrorCode } from '../index';

type ExpectedFuelError = Partial<FuelError> & Required<Pick<FuelError, 'code'>>;

const errorCodes = Object.values(ErrorCode);

export const compareErrors = (
  thrownError: FuelError | undefined,
  expectedError: ExpectedFuelError
) => {
  if (!thrownError) {
    throw new Error("Passed-in lambda didn't throw.");
  }

  if (!thrownError.code) {
    throw new Error('Thrown error must contain a code.');
  }

  if (!expectedError.code) {
    throw new Error('Expected error must contain a code.');
  }

  if (!errorCodes.includes(thrownError.code)) {
    throw new Error('Thrown error code is not a valid FuelError code.');
  }

  if (!errorCodes.includes(expectedError.code)) {
    throw new Error(`Expected error code '${expectedError.code}' is not a valid FuelError code.`);
  }

  expect(thrownError?.name).toEqual('FuelError');
  expect(thrownError).toMatchObject(expectedError);
};

/*
  Expect a SYNC lambda function.
*/
export const expectToThrowFuelError = (lambda: () => unknown, expectedError: ExpectedFuelError) => {
  const { error: thrownError } = safeExec<unknown, FuelError>(lambda);
  compareErrors(thrownError, expectedError);
};

/*
  Expect an ASYNC lambda function.
*/
export const expectToThrowFuelErrorAsync = async (
  lambda: () => Promise<unknown>,
  expectedError: ExpectedFuelError
) => {
  const { error: thrownError } = await safeExecAsync<unknown, FuelError>(lambda);
  compareErrors(thrownError, expectedError);
};
