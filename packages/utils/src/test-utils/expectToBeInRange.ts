import { ErrorCode, FuelError } from '@fuel-ts/errors';

/**
 * Expect that the value is within the range of min and max
 *
 * @throws {@link ErrorCode#INVALID_DATA}
 * When the value is more than the max value
 * When the value is less than the min value
 */
export const expectToBeInRange = (params: { value: number; min: number; max: number }) => {
  const { value, min, max } = params;
  if (value >= min && value <= max) {
    return true;
  }

  throw new FuelError(
    ErrorCode.INVALID_DATA,
    `Expected value: '${value}' to be within range: '${min}-${max}'`
  );
};
