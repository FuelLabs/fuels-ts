import { Fuel } from '../src/connectors/fuel';
import { ScriptTransactionRequest } from '../src/providers';
import { setupTestProviderAndWallets } from '../src/test-utils';

import { MockSendTransactionConnector } from './fixtures/mocked-send-transaction-connector';

async function setupConnector() {
  const launched = await setupTestProviderAndWallets();
  const {
    wallets: [connector],
  } = launched;
  const fuel = await new Fuel({
    connectors: [
      new MockSendTransactionConnector({
        wallets: [connector],
      }),
    ],
  }).init();

  return {
    ...launched,
    [Symbol.dispose]: () => launched.cleanup(),
    connector,
    fuel,
  };
}

/**
 * @group node
 * @group browser
 */
describe('Fuel Connector', () => {
  it('should ensure sendTransaction [estimated and funded, signed]', async () => {
    using launched = await setupConnector();
    const {
      connector,
      fuel,
      wallets: [sender],
    } = launched;

    // Create the request
    const request = new ScriptTransactionRequest();
    const baseAssetId = await sender.provider.getBaseAssetId();
    const resources = await sender.getResourcesToSpend([{ assetId: baseAssetId, amount: 1000 }]);
    request.addResources(resources);

    // Esimate and fund
    await request.estimateAndFund(sender);

    // Sign the transaction
    const signature = await sender.signTransaction(request);
    await request.updateWitnessByOwner(sender.address, signature);

    const estimateSpy = vi.spyOn(connector, 'getTransactionCost');
    const fundSpy = vi.spyOn(connector, 'fund');
    const signSpy = vi.spyOn(connector, 'signTransaction');

    // Send our transaction
    const transactionId = await fuel.sendTransaction(connector.address.toString(), request, {
      skipCustomFee: true, // Signed
    });

    // Ensure that the connector doesn't use the estimate, fund or sign methods
    expect(transactionId).toBeDefined();
    expect(estimateSpy).toHaveBeenCalledTimes(0);
    expect(fundSpy).toHaveBeenCalledTimes(0);
    expect(signSpy).toHaveBeenCalledTimes(0);
  });

  it('should ensure sendTransaction [estimated and funded, not signed]', async () => {
    using launched = await setupConnector();
    const {
      connector,
      fuel,
      wallets: [sender],
    } = launched;

    // Create the request
    const request = new ScriptTransactionRequest();
    const baseAssetId = await sender.provider.getBaseAssetId();
    const resources = await sender.getResourcesToSpend([{ assetId: baseAssetId, amount: 1000 }]);
    request.addResources(resources);

    // Estimate and fund
    await request.estimateAndFund(sender);

    const estimateSpy = vi.spyOn(connector, 'getTransactionCost');
    const fundSpy = vi.spyOn(connector, 'fund');
    const signSpy = vi.spyOn(connector, 'signTransaction');

    // Send our transaction
    const transactionId = await fuel.sendTransaction(connector.address.toString(), request);

    // Ensure that the connector doesn't use the estimate, fund or sign methods
    expect(transactionId).toBeDefined();
    expect(estimateSpy).toHaveBeenCalledTimes(0);
    expect(fundSpy).toHaveBeenCalledTimes(0);
    expect(signSpy).toHaveBeenCalledTimes(1);
  });

  it('should ensure sendTransaction [not estimated and funded, signed]', async () => {
    using launched = await setupConnector();
    const {
      connector,
      fuel,
      wallets: [sender],
    } = launched;

    // Create the request
    const request = new ScriptTransactionRequest();
    const baseAssetId = await sender.provider.getBaseAssetId();
    const resources = await sender.getResourcesToSpend([{ assetId: baseAssetId, amount: 1000 }]);
    request.addResources(resources);

    // Sign the transaction
    const signature = await sender.signTransaction(request);
    await request.updateWitnessByOwner(sender.address, signature);

    const estimateSpy = vi.spyOn(connector, 'getTransactionCost');
    const fundSpy = vi.spyOn(connector, 'fund');
    const signSpy = vi.spyOn(connector, 'signTransaction');

    // Send our transaction
    const transactionId = await fuel.sendTransaction(connector.address.toString(), request, {
      skipCustomFee: true, // Signed
      onBeforeSend: async (tx) => {
        const newSignature = await sender.signTransaction(tx);
        await tx.updateWitnessByOwner(sender.address, newSignature);
        return tx;
      },
    });

    // Ensure that the connector doesn't use the estimate, fund or sign methods
    expect(transactionId).toBeDefined();
    expect(estimateSpy).toHaveBeenCalledTimes(1);
    expect(fundSpy).toHaveBeenCalledTimes(1);
    expect(signSpy).toHaveBeenCalledTimes(1); // We need to resign after estimate and fund
  });

  it('should ensure sendTransaction [not estimated and funded, not signed]', async () => {
    using launched = await setupConnector();
    const {
      connector,
      fuel,
      wallets: [sender],
    } = launched;

    // Create the request
    const request = new ScriptTransactionRequest();
    const baseAssetId = await sender.provider.getBaseAssetId();
    const resources = await sender.getResourcesToSpend([{ assetId: baseAssetId, amount: 1000 }]);
    request.addResources(resources);

    const estimateSpy = vi.spyOn(connector, 'getTransactionCost');
    const fundSpy = vi.spyOn(connector, 'fund');
    const signSpy = vi.spyOn(connector, 'signTransaction');

    // Send our transaction
    const transactionId = await fuel.sendTransaction(connector.address.toString(), request);

    // Ensure that the connector doesn't use the estimate, fund or sign methods
    expect(transactionId).toBeDefined();
    expect(estimateSpy).toHaveBeenCalledTimes(1);
    expect(fundSpy).toHaveBeenCalledTimes(1);
    expect(signSpy).toHaveBeenCalledTimes(1);
  });
});
