import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import { bn } from '@fuel-ts/math';
import { InputType, OutputType } from '@fuel-ts/transactions';

import type { ExcludeResourcesOption } from '../resource';

import type {
  TransactionRequestInput,
  CoinTransactionRequestInput,
  MessageTransactionRequestInput,
} from './input';
import type { TransactionRequestOutput } from './output';
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
  owner: AbstractAddress
) => getRequestInputResourceOwner(input) === owner.toB256();

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
    } as Required<ExcludeResourcesOption>
  );

export const cacheRequestInputsResourcesFromOwner = (
  inputs: TransactionRequestInput[],
  owner: AbstractAddress
): ExcludeResourcesOption =>
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
    } as Required<ExcludeResourcesOption>
  );

export const getBurnableAssetCount = (opts: {
  inputs: TransactionRequestInput[];
  outputs: TransactionRequestOutput[];
}) => {
  const { inputs, outputs } = opts;
  const coinInputs = new Set(inputs.filter(isRequestInputCoin).map((input) => input.assetId));
  const changeOutputs = new Set(
    outputs.filter((output) => output.type === OutputType.Change).map((output) => output.assetId)
  );
  const difference = new Set([...coinInputs].filter((x) => !changeOutputs.has(x)));
  return difference.size;
};

export const validateTransactionForAssetBurn = (
  tx: TransactionRequest,
  enableAssetBurn: boolean = false
) => {
  // Asset burn is enabled
  if (enableAssetBurn) {
    return;
  }

  // No burnable assets detected
  if (getBurnableAssetCount(tx) <= 0) {
    return;
  }

  const message = [
    'Asset burn detected.',
    'Add the relevant change outputs to the transaction to avoid burning assets.',
    'Or enable asset burn, upon sending the transaction.',
  ].join('\n');
  throw new FuelError(ErrorCode.ASSET_BURN_DETECTED, message);
};
