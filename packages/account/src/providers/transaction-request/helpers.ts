import type { AbstractAddress } from '@fuel-ts/interfaces';
import { InputType } from '@fuel-ts/transactions';

import type { Resource, ExcludeResourcesOption } from '../resource';
import { isCoin } from '../resource';

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

export const getRequestInputResourceOwner = (
  input: CoinTransactionRequestInput | MessageTransactionRequestInput
) => (isRequestInputCoin(input) ? input.owner : input.recipient);

export const isRequestInputResourceFromOwner = (
  input: CoinTransactionRequestInput | MessageTransactionRequestInput,
  owner: AbstractAddress
) => getRequestInputResourceOwner(input) === owner.toB256();

export const cacheResources = (resources: Array<Resource>) =>
  resources.reduce(
    (cache, resource) => {
      if (isCoin(resource)) {
        cache.utxos.push(resource.id);
      } else {
        cache.messages.push(resource.nonce);
      }
      return cache;
    },
    {
      utxos: [],
      messages: [],
    } as Required<ExcludeResourcesOption>
  );
