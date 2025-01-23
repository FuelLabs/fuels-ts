import { FuelError } from '@fuel-ts/errors';

import { STRING_REGEX } from '../../../../matchers/sway-type-matchers';
import { STRING_TYPE } from '../../encoding-constants';
import type { CoderFactory, CoderFactoryParameters } from '../../encoding-types';
import { string } from '../string';

export const stringFactory = (
  { type: { swayType } }: CoderFactoryParameters,
  _factory: CoderFactory
) => {
  const match = STRING_REGEX.exec(swayType)?.groups;
  if (!match) {
    throw new FuelError(
      FuelError.CODES.CODER_NOT_FOUND,
      `Unable to find ${STRING_TYPE} coder for the provided type "${swayType}".`,
      { swayType }
    );
  }
  const encodedLength = parseInt(match.length, 10);
  return string(encodedLength);
};
