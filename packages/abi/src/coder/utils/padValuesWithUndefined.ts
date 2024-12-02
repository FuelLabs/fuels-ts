import type { InputValue } from '../abi-coder-types';

export const padValuesWithUndefined = (values: InputValue[], inputs: ArrayLike<unknown>) => {
  if (values.length >= inputs.length) {
    return values;
  }

  const paddedValues = values.slice();
  paddedValues.length = inputs.length;
  paddedValues.fill(undefined, values.length);
  return paddedValues;
};
