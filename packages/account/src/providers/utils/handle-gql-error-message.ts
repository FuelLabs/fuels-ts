import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { GraphQLError } from 'graphql';

export enum GqlErrorMessage {
  NOT_ENOUGH_COINS = 'not enough coins to fit the target',
  MAX_COINS_REACHED = 'max number of coins is reached while trying to fit the target',
}

export const handleGqlErrorMessage = (errorMessage: string, rawError: GraphQLError) => {
  switch (errorMessage) {
    case GqlErrorMessage.NOT_ENOUGH_COINS:
      throw new FuelError(
        ErrorCode.NOT_ENOUGH_FUNDS,
        `The account(s) sending the transaction don't have enough funds to cover the transaction.`,
        {},
        rawError
      );
    case GqlErrorMessage.MAX_COINS_REACHED:
      throw new FuelError(
        ErrorCode.MAX_COINS_REACHED,
        'The account retrieving coins has exceeded the maximum number of coins per asset. Please consider combining your coins into a single UTXO.',
        {},
        rawError
      );
    default:
      throw new FuelError(ErrorCode.INVALID_REQUEST, errorMessage);
  }
};
