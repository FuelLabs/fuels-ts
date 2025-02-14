import type { Address } from '@fuel-ts/address';

import { Fuel } from '../src/connectors/fuel';
import type { TransactionCost } from '../src/providers';
import { ScriptTransactionRequest } from '../src/providers';
import { setupTestProviderAndWallets } from '../src/test-utils';
import type { WalletUnlocked } from '../src/wallet';
import { Wallet } from '../src/wallet';

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

async function createRequest(
  wallet: WalletUnlocked,
  recipient: Address,
  opts: {
    shouldEstimate?: boolean;
    shouldFund?: boolean;
    shouldSign?: boolean;
  } = {}
) {
  const { shouldEstimate = true, shouldFund = true, shouldSign = true } = opts;

  // Create the request
  const request = new ScriptTransactionRequest();
  const baseAssetId = await wallet.provider.getBaseAssetId();
  const resources = await wallet.getResourcesToSpend([{ assetId: baseAssetId, amount: 1000 }]);
  request.addResources(resources);

  // Estimate
  let txCost: TransactionCost | undefined;
  if (shouldEstimate) {
    txCost = await wallet.getTransactionCost(request);
    request.maxFee = txCost.maxFee;
    request.gasLimit = txCost.gasUsed;
  }

  // Fund
  if (shouldFund) {
    txCost = txCost ?? (await wallet.getTransactionCost(request));
    await wallet.fund(request, txCost);
  }

  // Sign
  if (shouldSign) {
    const signature = await wallet.signTransaction(request);
    await request.updateWitnessByOwner(wallet.address, signature);
  }

  return request;
}

/**
 * @group node
 * @group browser
 */
describe('Fuel Connector', () => {
  it('should ensure sendTransaction [estimated, funded, signed]', async () => {
    using launched = await setupConnector();
    const { connector, fuel, provider } = launched;
    const recipient = Wallet.generate({ provider });

    // Create the request
    const request = await createRequest(connector, recipient.address);

    const estimateSpy = vi.spyOn(connector, 'getTransactionCost');
    const fundSpy = vi.spyOn(connector, 'fund');
    const signSpy = vi.spyOn(connector, 'signTransaction');

    // Send our transaction
    const transactionId = await fuel.sendTransaction(connector.address.toString(), request);

    // Ensure that the connector doesn't use the estimate, fund or sign methods
    expect(transactionId).toBeDefined();
    // TODO: work out how to determine whether a request has been estimated
    // expect(estimateSpy).toHaveBeenCalledTimes(0);
    expect(fundSpy).toHaveBeenCalledTimes(0);
    expect(signSpy).toHaveBeenCalledTimes(0);
  });

  it('should ensure sendTransaction [not estimated, not funded, not signed]', async () => {
    using launched = await setupConnector();
    const { connector, fuel, provider } = launched;
    const recipient = Wallet.generate({ provider });

    const request = await createRequest(connector, recipient.address, {
      shouldEstimate: false,
      shouldFund: false,
      shouldSign: false,
    });

    const estimateSpy = vi.spyOn(connector, 'getTransactionCost');
    const fundSpy = vi.spyOn(connector, 'fund');
    const signSpy = vi.spyOn(connector, 'signTransaction');

    // Send our transaction
    const transactionId = await fuel.sendTransaction(connector.address.toString(), request);

    // Ensure that the connector doesn't use the estimate, fund or sign methods
    expect(transactionId).toBeDefined();
    // TODO: work out how to determine whether a request has been estimated
    // expect(estimateSpy).toHaveBeenCalledTimes(1);
    expect(fundSpy).toHaveBeenCalledTimes(1);
    expect(signSpy).toHaveBeenCalledTimes(1);
  });

  it('should ensure sendTransaction [estimated, not funded, not signed]', async () => {
    using launched = await setupConnector();
    const { connector, fuel, provider } = launched;
    const recipient = Wallet.generate({ provider });

    const request = await createRequest(connector, recipient.address, {
      shouldEstimate: true,
      shouldFund: false,
      shouldSign: false,
    });

    const estimateSpy = vi.spyOn(connector, 'getTransactionCost');
    const fundSpy = vi.spyOn(connector, 'fund');
    const signSpy = vi.spyOn(connector, 'signTransaction');

    // Send our transaction
    const transactionId = await fuel.sendTransaction(connector.address.toString(), request);

    // Ensure that the connector doesn't use the estimate, fund or sign methods
    expect(transactionId).toBeDefined();
    // TODO: work out how to determine whether a request has been estimated
    // expect(estimateSpy).toHaveBeenCalledTimes(0);
    expect(fundSpy).toHaveBeenCalledTimes(1);
    expect(signSpy).toHaveBeenCalledTimes(1);
  });

  it('should ensure sendTransaction [estimated, funded, not signed]', async () => {
    using launched = await setupConnector();
    const { connector, fuel, provider } = launched;
    const recipient = Wallet.generate({ provider });

    const request = await createRequest(connector, recipient.address, {
      shouldEstimate: true,
      shouldFund: true,
      shouldSign: false,
    });

    const estimateSpy = vi.spyOn(connector, 'getTransactionCost');
    const fundSpy = vi.spyOn(connector, 'fund');
    const signSpy = vi.spyOn(connector, 'signTransaction');

    // Send our transaction
    const transactionId = await fuel.sendTransaction(connector.address.toString(), request);

    // Ensure that the connector doesn't use the estimate, fund or sign methods
    expect(transactionId).toBeDefined();
    // TODO: work out how to determine whether a request has been estimated
    // expect(estimateSpy).toHaveBeenCalledTimes(0);
    expect(fundSpy).toHaveBeenCalledTimes(0);
    expect(signSpy).toHaveBeenCalledTimes(1);
  });
});
