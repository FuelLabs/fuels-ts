import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { GraphQLError } from 'graphql';

export enum GqlErrorMessage {
  NOT_ENOUGH_COINS_MAX_COINS = 'the target cannot be met due to no coins available or exceeding the 255 coin limit.',
}

export const handleGqlErrorMessage = (errorMessage: string, rawError: GraphQLError) => {
  switch (errorMessage) {
    case GqlErrorMessage.NOT_ENOUGH_COINS_MAX_COINS:
      throw new FuelError(
        ErrorCode.NOT_ENOUGH_FUNDS,
        `Insufficient funds or too many small value coins. Consider combining UTXOs.`,
        {},
        rawError
      );
    default:
      throw new FuelError(ErrorCode.INVALID_REQUEST, errorMessage);
  }
};
