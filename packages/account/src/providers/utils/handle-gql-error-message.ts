import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { GraphQLError } from 'graphql';

export enum GqlErrorMessage {
  NOT_ENOUGH_COINS = 'not enough coins to fit the target',
  MAX_COINS_REACHED = 'max number of coins is reached while trying to fit the target',
}

type GqlError = { message: string } | GraphQLError;

const mapGqlErrorMessage = (error: GqlError): FuelError => {
  switch (error.message) {
    case GqlErrorMessage.NOT_ENOUGH_COINS:
      return new FuelError(
        ErrorCode.NOT_ENOUGH_FUNDS,
        `The account(s) sending the transaction don't have enough funds to cover the transaction.`,
        {},
        error
      );
    case GqlErrorMessage.MAX_COINS_REACHED:
      return new FuelError(
        ErrorCode.MAX_COINS_REACHED,
        'The account retrieving coins has exceeded the maximum number of coins per asset. Please consider combining your coins into a single UTXO.',
        {},
        error
      );
    default:
      return new FuelError(ErrorCode.INVALID_REQUEST, error.message, {}, error);
  }
};

const mapGqlErrorWithIncompatibleNodeVersion = (
  error: FuelError,
  incompatibleNodeVersionMessage: string | false
) => {
  if (!incompatibleNodeVersionMessage) {
    return error;
  }

  return new FuelError(
    error.code,
    `${error.message}\n\n${incompatibleNodeVersionMessage}`,
    error.metadata,
    error.rawError
  );
};

export const assertGqlResponseHasNoErrors = (
  errors: GqlError[] | undefined,
  incompatibleNodeVersionMessage: string | false = false
) => {
  if (!Array.isArray(errors)) {
    return;
  }

  const mappedErrors = errors.map(mapGqlErrorMessage);
  if (mappedErrors.length === 1) {
    throw mapGqlErrorWithIncompatibleNodeVersion(mappedErrors[0], incompatibleNodeVersionMessage);
  }

  const errorMessage = mappedErrors.map((err) => err.message).join('\n');
  throw mapGqlErrorWithIncompatibleNodeVersion(
    new FuelError(ErrorCode.INVALID_REQUEST, errorMessage, {}, mappedErrors),
    incompatibleNodeVersionMessage
  );
};
