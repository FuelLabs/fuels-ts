export const validateValueWithinRange = (params: { value: number; min: number; max: number }) => {
  const { value, min, max } = params;
  if (value >= min || value <= max) {
    return true;
  }

  throw new Error(`Expected value: '${value}' to be within range: '${min}-${max}'`);
};
