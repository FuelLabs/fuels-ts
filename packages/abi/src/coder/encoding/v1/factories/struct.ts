import { FuelError } from '@fuel-ts/errors';

import type { AbiTypeComponent } from '../../../../parser';
import { STRUCT_TYPE } from '../../encoding-constants';
import type { Coder, CoderFactory, CoderFactoryParameters } from '../../encoding-types';
import { struct } from '../struct';

export const structCoderFactory = (
  { type: { swayType, components } }: CoderFactoryParameters,
  factory: CoderFactory
) => {
  if (!components) {
    throw new FuelError(
      FuelError.CODES.CODER_NOT_FOUND,
      `The provided ${STRUCT_TYPE} type is missing ABI components.`,
      { swayType, components }
    );
  }

  const coders = components.reduce((obj, component: AbiTypeComponent) => {
    const o: Record<string, Coder> = obj;

    o[component.name] = factory(component, factory);
    return o;
  }, {});
  return struct(coders);
};
