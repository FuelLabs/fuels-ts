import { FuelError } from '@fuel-ts/errors';

import { VECTOR_TYPE } from '../../encoding-constants';
import type { CoderFactory, CoderFactoryParameters } from '../../encoding-types';
import { vector } from '../heap';

export const vectorFactory = (
  { type: { swayType, components } }: CoderFactoryParameters,
  factory: CoderFactory
) => {
  if (!components) {
    throw new FuelError(
      FuelError.CODES.CODER_NOT_FOUND,
      `The provided ${VECTOR_TYPE} type is missing ABI components.`,
      { swayType, components }
    );
  }

  const vecElementCoder = factory(components[0], factory);
  return vector(vecElementCoder);
};
