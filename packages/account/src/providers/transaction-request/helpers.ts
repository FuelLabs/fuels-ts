import type { AbstractAddress } from '@fuel-ts/interfaces';
import { bn } from '@fuel-ts/math';
import { InputType } from '@fuel-ts/transactions';

import type { ExcludeResourcesOption } from '../resource';

import type {
  TransactionRequestInput,
  CoinTransactionRequestInput,
  MessageTransactionRequestInput,
} from './input';

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
