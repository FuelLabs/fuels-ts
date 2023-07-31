import { safeExec } from '@fuel-ts/utils/test-utils';

import type { ErrorCode, FuelError } from '../index';

export const expectToThrowFuelError = async (
  lambda: () => unknown,
  expectedError: FuelError | { code: ErrorCode, message?: string}
) => {
  const { error } = await safeExec<unknown, FuelError>(lambda);

  expect(error?.code).toEqual(expectedError.code)
  expect(error?.name).toEqual('FuelError')

  if (expectedError?.message) {
    expect(error?.message).toEqual(expectedError.message)
  }
};
