import { Account } from '../src/account';
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

  const account = new Account(connector.address, connector.provider, fuel);

  return {
    ...launched,
    [Symbol.dispose]: () => launched.cleanup(),
    account,
    connector,
    fuel,
  };
}

/**
 * @group node
 * @group browser
 */
describe('Fuel Connector', () => {
  it('should ensure sendTransaction [not funded, not signed]', async () => {
    using launched = await setupConnector();
    const {
      account,
      connector,
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
    const transactionId = await account.sendTransaction(request);

    // Ensure that the connector doesn't use the estimate, fund or sign methods
    expect(transactionId).toBeDefined();
    expect(estimateSpy).toHaveBeenCalledTimes(1);
    expect(fundSpy).toHaveBeenCalledTimes(1);
    expect(signSpy).toHaveBeenCalledTimes(1);
  });

  it('should ensure sendTransaction [funded, not signed]', async () => {
    using launched = await setupConnector();
    const {
      account,
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

    // // Sign the transaction
    // const signature = await sender.signTransaction(request);
    // await request.updateWitnessByOwner(sender.address, signature);

    const estimateSpy = vi.spyOn(connector, 'getTransactionCost');
    const fundSpy = vi.spyOn(connector, 'fund');
    const signSpy = vi.spyOn(connector, 'signTransaction');

    // Send our transaction
    const transactionId = await account.sendTransaction(request);

    // Ensure that the connector signs the transaction
    expect(transactionId).toBeDefined();
    expect(estimateSpy).toHaveBeenCalledTimes(0);
    expect(fundSpy).toHaveBeenCalledTimes(0);
    expect(signSpy).toHaveBeenCalledTimes(1);
  });

  it('should ensure sendTransaction [funded, signed]', async () => {
    using launched = await setupConnector();
    const {
      account,
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

    // Sign the transaction
    const signature = await sender.signTransaction(request);
    await request.updateWitnessByOwner(sender.address, signature);

    const estimateSpy = vi.spyOn(connector, 'getTransactionCost');
    const fundSpy = vi.spyOn(connector, 'fund');
    const signSpy = vi.spyOn(connector, 'signTransaction');

    // Send our transaction
    const transactionId = await account.sendTransaction(request, {
      skipCustomFee: true, // Signed
    });

    // Ensure that the connector doesn't use the estimate, fund or sign methods
    expect(transactionId).toBeDefined();
    expect(estimateSpy).toHaveBeenCalledTimes(0);
    expect(fundSpy).toHaveBeenCalledTimes(0);
    expect(signSpy).toHaveBeenCalledTimes(0);
  });

  it('should invalidate transaction status', async () => {
    using launched = await setupConnector();
    const {
      account,
      connector,
      wallets: [sender, receiver],
    } = launched;

    const request = new ScriptTransactionRequest();
    const baseAssetId = await sender.provider.getBaseAssetId();
    const resources = await sender.getResourcesToSpend([{ assetId: baseAssetId, amount: 1000 }]);
    request.addResources(resources);

    // Estimate and fund
    await request.estimateAndFund(sender);

    // Invalidate the estimate and fund
    request.addCoinOutput(receiver.address, 1000, baseAssetId);

    const estimateSpy = vi.spyOn(connector, 'getTransactionCost');
    const fundSpy = vi.spyOn(connector, 'fund');

    // Send our transaction
    await account.sendTransaction(request);

    // Should estimate and fund
    expect(estimateSpy).toHaveBeenCalledTimes(1);
    expect(fundSpy).toHaveBeenCalledTimes(1);
  });
});
