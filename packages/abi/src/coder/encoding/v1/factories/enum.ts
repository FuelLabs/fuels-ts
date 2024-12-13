import { FuelError } from '@fuel-ts/errors';

import type { AbiTypeComponent } from '../../../../parser';
import { ENUM_TYPE } from '../../encoding-constants';
import type { Coder, CoderFactory, CoderFactoryParameters } from '../../encoding-types';
import { enumCoder } from '../enum';
import type { EnumCoder } from '../enum';

export const enumCoderFactory: CoderFactory<EnumCoder> = (
  { type: { swayType, components } }: CoderFactoryParameters,
  factory: CoderFactory
) => {
  if (!components) {
    throw new FuelError(
      FuelError.CODES.CODER_NOT_FOUND,
      `The provided ${ENUM_TYPE} type is missing ABI components.`,
      { swayType, components }
    );
  }

  const coders = components.reduce((obj, component: AbiTypeComponent) => {
    const o: Record<string, Coder> = obj;

    o[component.name] = factory(component, factory);
    return o;
  }, {});

  return enumCoder(coders);
};
