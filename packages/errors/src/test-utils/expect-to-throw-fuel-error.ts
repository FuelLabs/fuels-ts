import { ErrorCode } from '../error-codes';
import type { FuelError } from '../fuel-error';

import { safeExec } from './safeExec';

type ExpectedFuelError = Partial<FuelError> & Required<Pick<FuelError, 'code'>>;

const codes = Object.values(ErrorCode);

export const expectToThrowFuelError = async (
  lambda: () => unknown,
  expectedError: ExpectedFuelError
) => {
  if (!expectedError.code) {
    throw new Error('Expected error must contain a code.');
  }

  if (!codes.includes(expectedError.code)) {
    throw new Error(`Expected error code '${expectedError.code}' is not a valid FuelError code.`);
  }

  const { error: thrownError } = await safeExec<unknown, FuelError>(lambda);

  if (!thrownError) {
    throw new Error(`Passed-in lambda didn't throw.`);
  }

  const thrownErrorStr = `Thrown error >>> ${thrownError.toString()}`;

  if (!thrownError.code) {
    throw new Error(`Thrown error must contain a code. ${thrownErrorStr}`);
  }

  if (!codes.includes(thrownError.code)) {
    throw new Error(
      `Thrown error code '${thrownError.code}' is not a valid FuelError code. ${thrownErrorStr}`
    );
  }

  if (expectedError.metadata) {
    expect(thrownError.metadata).toEqual(expect.objectContaining(expectedError.metadata));
  }

  expect(thrownError.name).toEqual('FuelError');
  expect(thrownError).toMatchObject(expectedError);
};
