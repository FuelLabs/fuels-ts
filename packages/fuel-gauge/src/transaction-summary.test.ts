import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import type {
  WalletUnlocked,
  TransactionResultReceipt,
  Operation,
  TransactionSummary,
  TransactionResult,
} from 'fuels';
import {
  BN,
  FUEL_NETWORK_URL,
  getTransactionsSummaries,
  getTransactionSummary,
  getTransactionSummaryFromRequest,
  BaseAssetId,
  Provider,
  ScriptTransactionRequest,
  TransactionTypeName,
  Wallet,
} from 'fuels';

describe('TransactionSummary', () => {
  let provider: Provider;
  let wallet: WalletUnlocked;
  let gasPrice: BN;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    wallet = await generateTestWallet(provider, [[100_000_000, BaseAssetId]]);
    ({ minGasPrice: gasPrice } = provider.getGasConfig());
  });

  const verifyTransactionSummary = (params: {
    transaction: TransactionResult | TransactionSummary;
    isRequest?: boolean;
  }) => {
    const { transaction, isRequest } = params;

    expect(transaction.fee).toStrictEqual(expect.any(BN));
    expect(transaction.gasUsed).toStrictEqual(expect.any(BN));
    expect(transaction.operations).toStrictEqual(expect.any(Array<Operation>));
    expect(transaction.type).toEqual(TransactionTypeName.Script);
    expect(transaction.receipts).toStrictEqual(expect.any(Array<TransactionResultReceipt>));
    expect(transaction.isTypeMint).toBe(false);
    expect(transaction.isTypeCreate).toBe(false);
    expect(transaction.isTypeScript).toBe(true);
    expect(transaction.isStatusFailure).toBe(false);
    expect(transaction.isStatusSuccess).toBe(!isRequest);
    expect(transaction.isStatusPending).toBe(false);
    if (!isRequest) {
      expect((<TransactionResult>transaction).gqlTransaction).toStrictEqual(expect.any(Object));
      expect(transaction.blockId).toEqual(expect.any(String));
      expect(transaction.time).toEqual(expect.any(String));
      expect(transaction.status).toEqual(expect.any(String));
      expect(transaction.date).toEqual(expect.any(Date));
    }
  };

  it('should ensure getTransactionSummary executes just fine', async () => {
    const destination = Wallet.generate({
      provider,
    });
    const amountToTransfer = 100;

    const request = new ScriptTransactionRequest({
      gasLimit: 10000,
      gasPrice: 1,
    });

    request.addCoinOutput(destination.address, amountToTransfer, BaseAssetId);

    const resources = await wallet.getResourcesToSpend([[100_000]]);

    request.addResources(resources);

    const tx = await wallet.sendTransaction(request);

    const transactionResponse = await tx.waitForResult();

    const transactionSummary = await getTransactionSummary({
      id: tx.id,
      provider,
    });

    verifyTransactionSummary({
      transaction: transactionSummary,
    });

    expect(transactionResponse).toStrictEqual(transactionSummary);
    expect(transactionSummary.transaction).toStrictEqual(transactionResponse.transaction);
  });

  it('should ensure getTransactionsSummaries executes just fine', async () => {
    const sender = Wallet.generate({
      provider,
    });

    const tx1 = await wallet.transfer(sender.address, 500_000, BaseAssetId, {
      gasPrice,
      gasLimit: 10_000,
    });
    const transactionResponse1 = await tx1.waitForResult();

    const amountToTransfer = 100;

    const destination = Wallet.generate({
      provider,
    });

    const tx2 = await sender.transfer(destination.address, amountToTransfer, BaseAssetId, {
      gasPrice,
      gasLimit: 10_000,
    });
    const transactionResponse2 = await tx2.waitForResult();

    const { transactions } = await getTransactionsSummaries({
      provider,
      filters: {
        first: 2,
        owner: sender.address.toB256(),
      },
    });

    expect(transactions.length).toBe(2);

    transactions.forEach((transactionSummary) => {
      verifyTransactionSummary({
        transaction: transactionSummary,
      });
    });

    expect(transactions[0]).toStrictEqual(transactionResponse1);
    expect(transactions[1]).toStrictEqual(transactionResponse2);
  });

  it('should ensure getTransactionSummaryFromRequest executes just fine', async () => {
    const request = new ScriptTransactionRequest({
      gasLimit: 10000,
      gasPrice: 1,
    });

    const resources = await wallet.getResourcesToSpend([[100_000, BaseAssetId]]);

    request.addResources(resources);

    const transactionRequest = await wallet.populateTransactionWitnessesSignature(request);

    const transactionSummary = await getTransactionSummaryFromRequest({
      provider,
      transactionRequest,
    });
    verifyTransactionSummary({
      transaction: transactionSummary,
      isRequest: true,
    });

    expect(transactionSummary.transaction).toStrictEqual(transactionRequest.toTransaction());
  });
});
