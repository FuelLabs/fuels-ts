import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { GraphQLError } from 'graphql';

export enum GqlErrorMessage {
  NOT_ENOUGH_COINS = 'not enough coins to fit the target',
}

export const handleGqlErrorMessage = (errorMessage: string, rawError: GraphQLError) => {
  switch (errorMessage) {
    case GqlErrorMessage.NOT_ENOUGH_COINS:
      throw new FuelError(
        ErrorCode.NOT_ENOUGH_FUNDS,
        'The transaction does not have enough funds to cover its execution.',
        {},
        rawError
      );
    default:
      throw new FuelError(ErrorCode.INVALID_REQUEST, errorMessage);
  }
};
