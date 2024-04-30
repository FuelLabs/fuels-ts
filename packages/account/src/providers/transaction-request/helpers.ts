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

export const isRequestInputResource = (
  input: TransactionRequestInput
): input is CoinTransactionRequestInput | MessageTransactionRequestInput =>
  isRequestInputCoin(input) || isRequestInputMessage(input);

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
