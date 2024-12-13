import { FuelError } from '@fuel-ts/errors';

import type { AbiTypeComponent } from '../../../../parser';
import { TUPLE_TYPE } from '../../encoding-constants';
import type { CoderFactory, CoderFactoryParameters } from '../../encoding-types';
import { tuple } from '../tuple';
import type { TupleCoder } from '../tuple';

export const tupleCoderFactory: CoderFactory<TupleCoder> = (
  { type: { swayType, components } }: CoderFactoryParameters,
  factory: CoderFactory
) => {
  if (!components) {
    throw new FuelError(
      FuelError.CODES.CODER_NOT_FOUND,
      `The provided ${TUPLE_TYPE} type is missing ABI components.`,
      { swayType, components }
    );
  }

  const coders = components.map((component: AbiTypeComponent) => factory(component, factory));
  return tuple(coders);
};
