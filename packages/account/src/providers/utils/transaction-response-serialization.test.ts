import { setupTestProviderAndWallets } from '../../test-utils';
import { TransactionResponse } from '../transaction-response';

import {
  serializeTransactionResponseJson,
  deserializeTransactionResponseJson,
} from './transaction-response-serialization';

/**
 * @group node
 * @group browser
 */
describe('Transaction Response Serialization', () => {
  it('should serialize and deserialize a transaction response correctly [W/ TX REQUEST]', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();
    const request = await wallet.createTransfer(wallet.address, 100_000, baseAssetId, {
      expiration: 200,
      tip: 1,
      witnessLimit: 3000,
    });
    const response = await wallet.sendTransaction(request);
    await response.waitForResult();

    // Serialize the response
    const serialized = await serializeTransactionResponseJson(response);

    // Verify serialized data
    expect(serialized.id).toBe(response.id);
    expect(serialized.status).toBe(response.status);
    expect(serialized.abis).toBe(response.abis);
    expect(serialized.providerUrl).toBe(provider.url);
    expect(serialized.preConfirmationStatus).toBeDefined();
    expect(serialized.requestJson).toBeDefined();

    // Undefined because fetch was never called
    expect(serialized.gqlTransaction).toBeUndefined();

    // Deserialize the response
    const deserialized = deserializeTransactionResponseJson(serialized);

    // Verify deserialized data
    expect(deserialized.id).toBe(response.id);
    expect(deserialized.status).toBe(response.status);
    expect(deserialized.abis).toBe(response.abis);
    expect(deserialized.provider.url).toBe(provider.url);
    expect(deserialized.gqlTransaction).toBeUndefined();
    expect(deserialized.preConfirmationStatus).toBeDefined();
    expect(deserialized.request).toBeDefined();

    expect(request.toJSON()).toEqual(deserialized.request?.toJSON());
  });

  it('should serialize and deserialize a transaction response correctly [W/O TX REQUEST]', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const { id } = await wallet.transfer(wallet.address, 100_000);

    const response = new TransactionResponse(id, provider, await provider.getChainId());
    await response.waitForResult();

    // Serialize the response
    const serialized = await serializeTransactionResponseJson(response);

    // Verify serialized data
    expect(serialized.id).toBe(response.id);
    expect(serialized.status).toBe(response.status);
    expect(serialized.abis).toBe(response.abis);
    expect(serialized.providerUrl).toBe(provider.url);
    expect(serialized.gqlTransaction).toBeDefined();

    // Undefined because it was not provided at the constructor
    expect(serialized.requestJson).toBeUndefined();
    expect(serialized.preConfirmationStatus).toBeUndefined();

    // Deserialize the response
    const deserialized = deserializeTransactionResponseJson(serialized);

    // Verify deserialized data
    expect(deserialized.id).toBe(response.id);
    expect(deserialized.status).toBe(response.status);
    expect(deserialized.abis).toBe(response.abis);
    expect(deserialized.provider.url).toBe(provider.url);
    expect(deserialized.gqlTransaction).toBeDefined();

    expect(deserialized.preConfirmationStatus).toBeUndefined();
    expect(deserialized.request).toBeUndefined();
  });

  it('should serialize and deserialize a transaction response correctly [W/ TX REQUEST AND NEW TX RESPONSE]', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    const request = await wallet.createTransfer(wallet.address, 100_000);
    await wallet.sendTransaction(request);

    const response = new TransactionResponse(request, provider, await provider.getChainId());
    await response.waitForResult();

    // Serialize the response
    const serialized = await serializeTransactionResponseJson(response);

    // Verify serialized data
    expect(serialized.id).toBe(response.id);
    expect(serialized.status).toBe(response.status);
    expect(serialized.abis).toBe(response.abis);
    expect(serialized.providerUrl).toBe(provider.url);
    expect(serialized.requestJson).toBeDefined();

    // 'gqlTransaction' will be undefined because the TX request was provided
    expect(serialized.gqlTransaction).toBeUndefined();
    expect(serialized.preConfirmationStatus).toBeUndefined();

    // Deserialize the response
    const deserialized = deserializeTransactionResponseJson(serialized);

    // Verify deserialized data
    expect(deserialized.id).toBe(response.id);
    expect(deserialized.status).toBe(response.status);
    expect(deserialized.abis).toBe(response.abis);
    expect(deserialized.provider.url).toBe(provider.url);
    expect(deserialized.request).toBeDefined();

    expect(deserialized.preConfirmationStatus).toBeUndefined();
    expect(deserialized.gqlTransaction).toBeUndefined();

    expect(request.toJSON()).toEqual(deserialized.request?.toJSON());
  });
});
