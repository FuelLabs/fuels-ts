import type { Address } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import { InputType, OutputType } from '@fuel-ts/transactions';
import { hexlify } from '@fuel-ts/utils';

import type { ResourcesIDsToIgnore } from '../provider';

import type {
  TransactionRequestInput,
  CoinTransactionRequestInput,
  MessageTransactionRequestInput,
} from './input';
import type { TransactionRequest } from './types';

export const isRequestInputCoin = (
  input: TransactionRequestInput
): input is CoinTransactionRequestInput => input.type === InputType.Coin;

export const isRequestInputMessage = (
  input: TransactionRequestInput
): input is MessageTransactionRequestInput => input.type === InputType.Message;

export const isRequestInputMessageWithoutData = (
  input: TransactionRequestInput
): input is MessageTransactionRequestInput =>
  input.type === InputType.Message && bn(input.data).isZero();

export const isRequestInputCoinOrMessage = (
  input: TransactionRequestInput
): input is CoinTransactionRequestInput | MessageTransactionRequestInput =>
  isRequestInputCoin(input) || isRequestInputMessage(input);

export const isRequestInputResource = (
  input: TransactionRequestInput
): input is CoinTransactionRequestInput | MessageTransactionRequestInput =>
  isRequestInputCoin(input) || isRequestInputMessageWithoutData(input);

export const getRequestInputResourceOwner = (
  input: CoinTransactionRequestInput | MessageTransactionRequestInput
) => (isRequestInputCoin(input) ? input.owner : input.recipient);

export const isRequestInputResourceFromOwner = (
  input: CoinTransactionRequestInput | MessageTransactionRequestInput,
  owner: Address
) => getRequestInputResourceOwner(input) === owner.toB256();

/**
 * @hidden
 *
 * Checks if the given `TransactionRequestInput` is a predicate.
 *
 * @param input - The `TransactionRequestInput` to check.
 * @returns `true` if the input is a predicate, otherwise `false`.
 */
export const isPredicate = (
  input: TransactionRequestInput
): input is Required<CoinTransactionRequestInput | MessageTransactionRequestInput> =>
  isRequestInputCoinOrMessage(input) && !!input.predicate && hexlify(input.predicate) !== '0x';

export const getAssetAmountInRequestInputs = (
  inputs: TransactionRequestInput[],
  assetId: string,
  baseAsset: string
) =>
  inputs.filter(isRequestInputResource).reduce((acc, input) => {
    if (isRequestInputCoin(input) && input.assetId === assetId) {
      return acc.add(input.amount);
    }

    if (isRequestInputMessage(input) && assetId === baseAsset) {
      return acc.add(input.amount);
    }

    return acc;
  }, bn(0));

export const cacheRequestInputsResources = (inputs: TransactionRequestInput[]) =>
  inputs.filter(isRequestInputResource).reduce(
    (cache, input) => {
      if (isRequestInputCoin(input)) {
        cache.utxos.push(input.id);
      } else {
        cache.messages.push(input.nonce);
      }
      return cache;
    },
    {
      utxos: [],
      messages: [],
    } as Required<ResourcesIDsToIgnore>
  );

export const cacheRequestInputsResourcesFromOwner = (
  inputs: TransactionRequestInput[],
  owner: Address
): ResourcesIDsToIgnore =>
  inputs.reduce(
    (acc, input) => {
      if (isRequestInputCoin(input) && input.owner === owner.toB256()) {
        acc.utxos.push(input.id);
      } else if (isRequestInputMessage(input) && input.recipient === owner.toB256()) {
        acc.messages.push(input.nonce);
      }
      return acc;
    },
    {
      utxos: [],
      messages: [],
    } as Required<ResourcesIDsToIgnore>
  );

/**
 * @hidden
 *
 * Get the number of burnable assets in the transaction request.
 *
 * @param baseAssetId - The base asset ID.
 * @param transactionRequest - The transaction request to get the burnable asset count from.
 * @returns The number of burnable assets in the transaction request.
 */
export const getBurnableAssetCount = (
  baseAssetId: string,
  transactionRequest: TransactionRequest
) => {
  const { inputs, outputs } = transactionRequest;
  const coinInputs = new Set(inputs.filter(isRequestInputCoin).map((input) => input.assetId));
  // If there is a message input without data, we need to add the base asset to the set
  if (inputs.some((i) => isRequestInputMessage(i) && bn(i.amount).gt(0))) {
    coinInputs.add(baseAssetId);
  }
  const changeOutputs = new Set(
    outputs.filter((output) => output.type === OutputType.Change).map((output) => output.assetId)
  );
  const difference = new Set([...coinInputs].filter((x) => !changeOutputs.has(x)));
  return difference.size;
};

/**
 * @hidden
 *
 * Validates the transaction request for asset burn.
 *
 * @param transactionRequest - The transaction request to validate.
 * @param enableAssetBurn - Whether asset burn is enabled (default: false).
 *
 * @throws `FuelError` when an asset burn is detected and not enabled.
 */
export const validateTransactionForAssetBurn = (
  baseAssetId: string,
  transactionRequest: TransactionRequest,
  enableAssetBurn: boolean = false
) => {
  // Asset burn is enabled
  if (enableAssetBurn === true) {
    return;
  }

  // No burnable assets detected
  if (getBurnableAssetCount(baseAssetId, transactionRequest) <= 0) {
    return;
  }

  const message = [
    'Asset burn detected.',
    'Add the relevant change outputs to the transaction to avoid burning assets.',
    'Or enable asset burn, upon sending the transaction.',
  ].join('\n');
  throw new FuelError(ErrorCode.ASSET_BURN_DETECTED, message);
};
