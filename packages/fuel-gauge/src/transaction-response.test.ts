import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import type { BN, WalletUnlocked } from 'fuels';
import { BaseAssetId, FUEL_NETWORK_URL, Provider, TransactionResponse, Wallet } from 'fuels';

describe('TransactionSummary', () => {
  let provider: Provider;
  let adminWallet: WalletUnlocked;
  let gasPrice: BN;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    adminWallet = await generateTestWallet(provider, [[500_000]]);
    ({ minGasPrice: gasPrice } = provider.getGasConfig());
  });

  it('should ensure create method waits till a transaction response is given', async () => {
    const destination = Wallet.generate({
      provider,
    });

    const { id: transactionId } = await adminWallet.transfer(
      destination.address,
      100,
      BaseAssetId,
      { gasPrice, gasLimit: 10_000 }
    );

    const response = await TransactionResponse.create(transactionId, provider);

    expect(response.gqlTransaction).toBeDefined();
    expect(response.gqlTransaction?.status).toBeDefined();
    expect(response.gqlTransaction?.id).toBe(transactionId);
  });

  it('should ensure getTransactionSummary fetchs a transaction and assembles transaction summary', async () => {
    const destination = Wallet.generate({
      provider,
    });

    const { id: transactionId } = await adminWallet.transfer(
      destination.address,
      100,
      BaseAssetId,
      { gasPrice, gasLimit: 10_000 }
    );

    const response = new TransactionResponse(transactionId, provider);

    expect(response.gqlTransaction).toBeUndefined();

    const transactionSummary = await response.getTransactionSummary();

    expect(transactionSummary.id).toBeDefined();
    expect(transactionSummary.fee).toBeDefined();
    expect(transactionSummary.gasUsed).toBeDefined();
    expect(transactionSummary.operations).toBeDefined();
    expect(transactionSummary.type).toBeDefined();
    expect(transactionSummary.blockId).toBeDefined();
    expect(transactionSummary.time).toBeDefined();
    expect(transactionSummary.status).toBeDefined();
    expect(transactionSummary.receipts).toBeDefined();
    expect(transactionSummary.mintedAssets).toBeDefined();
    expect(transactionSummary.burnedAssets).toBeDefined();
    expect(transactionSummary.isTypeMint).toBeDefined();
    expect(transactionSummary.isTypeCreate).toBeDefined();
    expect(transactionSummary.isTypeScript).toBeDefined();
    expect(transactionSummary.isStatusFailure).toBeDefined();
    expect(transactionSummary.isStatusSuccess).toBeDefined();
    expect(transactionSummary.isStatusPending).toBeDefined();
    expect(transactionSummary.transaction).toBeDefined();

    expect(response.gqlTransaction).toBeDefined();
    expect(response.gqlTransaction?.status).toBeDefined();
    expect(response.gqlTransaction?.id).toBe(transactionId);
  });

  it('should ensure waitForResult always waits for the transaction to be processed', async () => {
    const destination = Wallet.generate({
      provider,
    });

    const { id: transactionId } = await adminWallet.transfer(
      destination.address,
      100,
      BaseAssetId,
      { gasPrice, gasLimit: 10_000 }
    );

    const response = new TransactionResponse(transactionId, provider);

    expect(response.gqlTransaction).toBeUndefined();

    await response.waitForResult();

    expect(response.gqlTransaction?.status?.type).toBeDefined();
    expect(response.gqlTransaction?.status?.type).not.toEqual('SubmittedStatus');
    expect(response.gqlTransaction?.id).toBe(transactionId);
  });
});
