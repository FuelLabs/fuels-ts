import { FuelError } from '@fuel-ts/errors';

import type { AbiTypeComponent } from '../../../../parser';
import { OPTION_TYPE } from '../../encoding-constants';
import type { CoderFactory, CoderFactoryParameters, Coder } from '../../encoding-types';
import { option } from '../option';

export const optionFactory = (
  { type: { swayType, components } }: CoderFactoryParameters,
  factory: CoderFactory
) => {
  if (!components) {
    throw new FuelError(
      FuelError.CODES.CODER_NOT_FOUND,
      `The provided ${OPTION_TYPE} type is missing ABI components.`,
      { swayType, components }
    );
  }

  const coders = components.reduce((obj, component: AbiTypeComponent) => {
    const o: Record<string, Coder> = obj;

    o[component.name] = factory(component, factory);
    return o;
  }, {});

  return option(coders);
};
