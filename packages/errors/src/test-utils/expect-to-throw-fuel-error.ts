import { safeExec } from '@fuel-ts/utils/test-utils';

import { FuelError } from '../index';

export const expectToThrowFuelError = async (
  lambda: () => unknown,
  expectedError: FuelError | (Partial<FuelError> & Required<Pick<FuelError, 'code'>>)
) => {
  const { error } = await safeExec<unknown, FuelError>(lambda);
  if (error === undefined) {
    // this is a safeguard to not
    expect(error).toBeDefined();
    return;
  }
  expect(error).toBeInstanceOf(FuelError);
  expect(error.code).toEqual(expectedError.code);
  (Object.keys(expectedError) as Array<keyof typeof expectedError>).forEach((key) => {
    expect(expectedError[key]).toStrictEqual(error[key]);
  });
};
