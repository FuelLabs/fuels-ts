import { FuelError, ErrorCode } from '@fuel-ts/errors';

import type { CursorPaginationArgs } from '../provider';

/**
 * @hidden
 */
export const validatePaginationArgs = (params: {
  inputArgs?: CursorPaginationArgs;
  paginationLimit: number;
}): CursorPaginationArgs => {
  const { paginationLimit, inputArgs = {} } = params;
  const { first, last, after, before } = inputArgs;

  if (after && before) {
    throw new FuelError(
      ErrorCode.INVALID_INPUT_PARAMETERS,
      'Pagination arguments "after" and "before" cannot be used together'
    );
  }

  if ((first || 0) > paginationLimit || (last || 0) > paginationLimit) {
    throw new FuelError(
      ErrorCode.INVALID_INPUT_PARAMETERS,
      `Pagination limit for this query cannot exceed ${paginationLimit} items`
    );
  }

  if (first && before) {
    throw new FuelError(
      ErrorCode.INVALID_INPUT_PARAMETERS,
      'The use of pagination argument "first" with "before" is not supported'
    );
  }

  if (last && after) {
    throw new FuelError(
      ErrorCode.INVALID_INPUT_PARAMETERS,
      'The use of pagination argument "last" with "after" is not supported'
    );
  }

  // If neither first nor last is provided, set a default first value
  if (!first && !last) {
    inputArgs.first = paginationLimit;
  }

  return inputArgs;
};
