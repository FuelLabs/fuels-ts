import { FuelError } from '@fuel-ts/errors';

export const expectToBeInRange = (params: { value: number; min: number; max: number }) => {
  const { value, min, max } = params;
  if (value >= min && value <= max) {
    return true;
  }

  throw new FuelError(
    FuelError.CODES.INVALID_INPUT_PARAMETERS,
    `Expected value: '${value}' to be within range: '${min}-${max}'`
  );
};
