import { safeExec } from '@fuel-ts/utils/test-utils';

import { FuelError } from '../index';

export const expectToThrowFuelError = async (
  lambda: () => unknown,
  expectedError: FuelError | (Partial<FuelError> & Required<Pick<FuelError, 'code'>>)
) => {
  const { error } = await safeExec<unknown, FuelError>(lambda);
  const matcher = { name: 'FuelError', ...expectedError };
  expect(error).toBeInstanceOf(FuelError);
  expect(error?.toObject()).toMatchObject(matcher);
};
