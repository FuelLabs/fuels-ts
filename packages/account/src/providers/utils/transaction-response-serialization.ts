import Provider from '../provider';
import { transactionRequestify } from '../transaction-request';
import type { TransactionResponseJson } from '../transaction-response';
import { TransactionResponse } from '../transaction-response';

import { serializeProviderCache } from './serialization';

/**
 * NOTE: This is defined within a new file to avoid circular dependencies.
 */

export const serializeTransactionResponseJson = async (
  response: TransactionResponse
): Promise<TransactionResponseJson> => {
  const { id, status, abis, request, provider, gqlTransaction, preConfirmationStatus } = response;
  return {
    id,
    status,
    abis,
    requestJson: request ? JSON.stringify(request.toJSON()) : undefined,
    providerUrl: provider.url,
    providerCache: await serializeProviderCache(provider),
    gqlTransaction,
    preConfirmationStatus,
  };
};

export const deserializeTransactionResponseJson = (json: TransactionResponseJson) => {
  const {
    id,
    abis,
    status,
    providerUrl,
    requestJson,
    providerCache,
    gqlTransaction,
    preConfirmationStatus,
  } = json;

  const provider = new Provider(providerUrl, { cache: providerCache });
  const { chainId } = providerCache.chain.consensusParameters;

  const response = new TransactionResponse(id, provider, Number(chainId), abis);

  if (requestJson) {
    response.request = transactionRequestify(JSON.parse(requestJson));
  }

  response.status = status;
  response.gqlTransaction = gqlTransaction;
  response.preConfirmationStatus = preConfirmationStatus;

  return response;
};
