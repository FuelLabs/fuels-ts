import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { GraphQLError } from 'graphql';

const gqlErrorMessage = {
  RPC_CONSISTENCY:
    /The required fuel block height is higher than the current block height. Required: \d+, Current: \d+/,
  NOT_ENOUGH_COINS_MAX_COINS:
    /the target cannot be met due to no coins available or exceeding the \d+ coin limit./,
  ASSET_NOT_FOUND: /resource was not found in table/,
  MULTIPLE_CHANGE_POLICIES: /The asset ([a-fA-F0-9]{64}) has multiple change policies/,
  DUPLICATE_CHANGE_CHANGE_OUTPUT_ACCOUNT:
    /required balances contain duplicate \(asset, account\) pair/,
};

type GqlError = { message: string } | GraphQLError;

const mapGqlErrorMessage = (error: GqlError): FuelError => {
  if (gqlErrorMessage.NOT_ENOUGH_COINS_MAX_COINS.test(error.message)) {
    return new FuelError(
      ErrorCode.INSUFFICIENT_FUNDS_OR_MAX_COINS,
      `Insufficient funds or too many small value coins. Consider combining UTXOs.`,
      {},
      error
    );
  }

  if (gqlErrorMessage.MULTIPLE_CHANGE_POLICIES.test(error.message)) {
    const match = error.message.match(/asset ([a-fA-F0-9]{64})/);
    const assetId = match?.[1] || '';
    return new FuelError(
      ErrorCode.CHANGE_OUTPUT_COLLISION,
      `OutputChange address for asset 0x${assetId} differs between transaction request and assembleTx parameters.`,
      {},
      error
    );
  }

  if (gqlErrorMessage.DUPLICATE_CHANGE_CHANGE_OUTPUT_ACCOUNT.test(error.message)) {
    return new FuelError(
      ErrorCode.DUPLICATE_CHANGE_OUTPUT_ACCOUNT,
      `The parameter 'accountCoinQuantities' of assembleTx contains duplicate entries for the same assetId with different 'changeOutputAccount'.`,
      {},
      error
    );
  }

  if (gqlErrorMessage.ASSET_NOT_FOUND.test(error.message)) {
    return new FuelError(
      ErrorCode.ASSET_NOT_FOUND,
      `Asset not found for given asset id.`,
      {},
      error
    );
  }

  if (gqlErrorMessage.RPC_CONSISTENCY.test(error.message)) {
    return new FuelError(ErrorCode.RPC_CONSISTENCY, error.message, {}, error);
  }

  return new FuelError(ErrorCode.INVALID_REQUEST, error.message, {}, error);
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
