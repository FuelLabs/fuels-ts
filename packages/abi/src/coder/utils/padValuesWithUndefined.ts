import type { InputValue } from '../encoding/encoding-types';

export const padValuesWithUndefined = (values: InputValue[], inputs: ArrayLike<unknown>) => {
  if (values.length >= inputs.length) {
    return values;
  }

  return [...values, ...Array(inputs.length - values.length).fill(undefined)];
};
