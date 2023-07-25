import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import type { WalletUnlocked, TransactionResultReceipt, Operation } from 'fuels';
import {
  BN,
  FUEL_NETWORK_URL,
  getTransactionsSummaries,
  getTransactionSummary,
  getTransactionSummaryFromRequest,
  NativeAssetId,
  Provider,
  ScriptTransactionRequest,
  TransactionTypeNameEnum,
  Wallet,
} from 'fuels';

describe('TransactionSummary', () => {
  let provider: Provider;
  let wallet: WalletUnlocked;

  beforeEach(async () => {
    provider = new Provider(FUEL_NETWORK_URL);
    wallet = await generateTestWallet(provider, [[1_000, NativeAssetId]]);
  });

  it('should ensure getTransactionSummary executes just fine', async () => {
    const destination = Wallet.generate();
    const amountToTransfer = 100;

    const request = new ScriptTransactionRequest({
      gasLimit: 10000,
      gasPrice: 1,
    });

    request.addCoinOutput(destination.address, amountToTransfer, NativeAssetId);

    const calculatedFee = request.calculateFee();

    const resources = await wallet.getResourcesToSpend([
      [calculatedFee.amount.add(amountToTransfer), NativeAssetId],
    ]);

    request.addResourceInputsAndOutputs(resources);

    const tx = await wallet.sendTransaction(request);

    const transactionResponse = await tx.waitForResult();

    const transactionSummary = await getTransactionSummary(tx.id, provider);

    expect(transactionSummary.id).toBe(tx.id);
    expect(transactionSummary.fee).toStrictEqual(expect.any(BN));
    expect(transactionSummary.gasUsed).toStrictEqual(expect.any(BN));
    expect(transactionSummary.operations).toStrictEqual(expect.any(Array<Operation>));
    expect(transactionSummary.type).toEqual(TransactionTypeNameEnum.Script);
    expect(transactionSummary.blockId).toEqual(expect.any(String));
    expect(transactionSummary.time).toEqual(expect.any(String));
    expect(transactionSummary.status).toEqual(expect.any(String));
    expect(transactionSummary.gqlTransaction).toStrictEqual(expect.any(Object));
    expect(transactionSummary.receipts).toStrictEqual(expect.any(Array<TransactionResultReceipt>));
    expect(transactionSummary.isTypeMint).toBe(false);
    expect(transactionSummary.isTypeCreate).toBe(false);
    expect(transactionSummary.isTypeScript).toBe(true);
    expect(transactionSummary.isStatusFailure).toBe(false);
    expect(transactionSummary.isStatusSuccess).toBe(true);
    expect(transactionSummary.isStatusPending).toBe(false);
    expect(transactionSummary.transaction).toStrictEqual(transactionResponse.transaction);

    expect(transactionResponse).toStrictEqual(transactionSummary);
  });

  it('should ensure getTransactionsSummaries executes just fine', async () => {
    const sender = Wallet.generate();

    const tx1 = await wallet.transfer(sender.address, 200);
    const transactionResponse1 = await tx1.waitForResult();

    const amountToTransfer = 100;

    const destination = Wallet.generate();

    const tx2 = await sender.transfer(destination.address, amountToTransfer);
    const transactionResponse2 = await tx2.waitForResult();

    const { transactions } = await getTransactionsSummaries(provider, {
      first: 2,
      owner: sender.address.toB256(),
    });

    expect(transactions.length).toBe(2);

    transactions.forEach((transactionSummary) => {
      expect(transactionSummary.id).toBeDefined();
      expect(transactionSummary.fee).toStrictEqual(expect.any(BN));
      expect(transactionSummary.gasUsed).toStrictEqual(expect.any(BN));
      expect(transactionSummary.operations).toStrictEqual(expect.any(Array<Operation>));
      expect(transactionSummary.type).toEqual(TransactionTypeNameEnum.Script);
      expect(transactionSummary.blockId).toEqual(expect.any(String));
      expect(transactionSummary.time).toEqual(expect.any(String));
      expect(transactionSummary.status).toEqual(expect.any(String));
      expect(transactionSummary.gqlTransaction).toStrictEqual(expect.any(Object));
      expect(transactionSummary.receipts).toStrictEqual(
        expect.any(Array<TransactionResultReceipt>)
      );
      expect(transactionSummary.isTypeMint).toBe(false);
      expect(transactionSummary.isTypeCreate).toBe(false);
      expect(transactionSummary.isTypeScript).toBe(true);
      expect(transactionSummary.isStatusFailure).toBe(false);
      expect(transactionSummary.isStatusSuccess).toBe(true);
      expect(transactionSummary.isStatusPending).toBe(false);
    });

    expect(transactions[0]).toStrictEqual(transactionResponse1);
    expect(transactions[1]).toStrictEqual(transactionResponse2);
  });

  it('should ensure getTransactionSummaryFromRequest executes just fine', async () => {
    const request = new ScriptTransactionRequest({
      gasLimit: 10000,
      gasPrice: 1,
    });
    const fee = request.calculateFee();

    const amountToTransfer = 100;
    const resources = await wallet.getResourcesToSpend([
      [fee.amount.add(amountToTransfer), NativeAssetId],
    ]);

    request.addResourceInputsAndOutputs(resources);

    const transactionRequest = await wallet.populateTransactionWitnessesSignature(request);

    const transactionSummary = await getTransactionSummaryFromRequest(transactionRequest, provider);

    expect(transactionSummary.id).toBeUndefined();
    expect(transactionSummary.fee).toStrictEqual(expect.any(BN));
    expect(transactionSummary.gasUsed).toStrictEqual(expect.any(BN));
    expect(transactionSummary.operations).toStrictEqual([]);
    expect(transactionSummary.type).toEqual(TransactionTypeNameEnum.Script);
    expect(transactionSummary.blockId).toBeUndefined();
    expect(transactionSummary.time).toBeUndefined();
    expect(transactionSummary.status).toBeUndefined();
    expect(transactionSummary.receipts).toStrictEqual(expect.any(Array<TransactionResultReceipt>));
    expect(transactionSummary.isTypeMint).toBe(false);
    expect(transactionSummary.isTypeCreate).toBe(false);
    expect(transactionSummary.isTypeScript).toBe(true);
    expect(transactionSummary.isStatusFailure).toBe(false);
    expect(transactionSummary.isStatusSuccess).toBe(false);
    expect(transactionSummary.isStatusPending).toBe(false);
    expect(transactionSummary.transaction).toStrictEqual(transactionRequest.toTransaction());
  });
});
