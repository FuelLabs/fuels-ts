import { FuelError } from '@fuel-ts/errors';

import type { AbiTypeComponent } from '../../../..';
import { ARRAY_REGEX } from '../../../../matchers/sway-type-matchers';
import { ARRAY_TYPE } from '../../encoding-constants';
import type { CoderFactory, CoderFactoryParameters } from '../../encoding-types';
import type { ArrayCoder } from '../array';
import { arrayCoder } from '../array';

export const arrayCoderFactory: CoderFactory<ArrayCoder> = (
  { type: { swayType, components } }: CoderFactoryParameters,
  factory: CoderFactory
) => {
  const arrayMatch = ARRAY_REGEX.exec(swayType)?.groups;
  if (!arrayMatch) {
    throw new FuelError(
      FuelError.CODES.CODER_NOT_FOUND,
      `The provided ${ARRAY_TYPE} type is missing ABI components.`,
      { swayType, components }
    );
  }

  const arraySize = parseInt(arrayMatch.length, 10);
  const arrayElement: AbiTypeComponent | undefined = components?.[0];
  if (!arrayElement) {
    throw new FuelError(
      FuelError.CODES.CODER_NOT_FOUND,
      `The provided ${ARRAY_TYPE} type is missing a ABI component.`
    );
  }

  const arrayElementCoder = factory(arrayElement, factory);
  return arrayCoder(arrayElementCoder, arraySize);
};
