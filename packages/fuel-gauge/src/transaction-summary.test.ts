import { generateTestWallet } from '@fuel-ts/account/test-utils';
import { ASSET_A, ASSET_B } from '@fuel-ts/utils/test-utils';
import type {
  WalletUnlocked,
  TransactionResultReceipt,
  Operation,
  TransactionSummary,
  TransactionResult,
  AbstractAddress,
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
  AddressType,
  OperationName,
} from 'fuels';

import { FuelGaugeProjectsEnum } from '../test/fixtures';

import { getSetupContract } from './utils';

/**
 * @group node
 */
describe('TransactionSummary', () => {
  let provider: Provider;
  let adminWallet: WalletUnlocked;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    adminWallet = await generateTestWallet(provider, [[100_000_000, BaseAssetId]]);
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
    });

    request.addCoinOutput(destination.address, amountToTransfer, BaseAssetId);

    const { gasUsed, requiredQuantities, maxFee, inputsWithEstimatedPredicates, addedSignatures } =
      await adminWallet.provider.getTransactionCost(request, []);

    request.gasLimit = gasUsed;
    request.maxFee = maxFee;

    await adminWallet.fund(
      request,
      requiredQuantities,
      maxFee,
      inputsWithEstimatedPredicates,
      addedSignatures
    );

    const tx = await adminWallet.sendTransaction(request);

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

    const tx1 = await adminWallet.transfer(sender.address, 500_000, BaseAssetId, {
      gasLimit: 10_000,
    });
    const transactionResponse1 = await tx1.waitForResult();

    const amountToTransfer = 100;

    const destination = Wallet.generate({
      provider,
    });

    const tx2 = await sender.transfer(destination.address, amountToTransfer, BaseAssetId, {
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
    });

    const { gasUsed, requiredQuantities, maxFee, inputsWithEstimatedPredicates, addedSignatures } =
      await adminWallet.provider.getTransactionCost(request, []);

    request.gasLimit = gasUsed;
    request.maxFee = maxFee;

    await adminWallet.fund(
      request,
      requiredQuantities,
      maxFee,
      inputsWithEstimatedPredicates,
      addedSignatures
    );

    const transactionRequest = await adminWallet.populateTransactionWitnessesSignature(request);

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

  describe('Transfer Operations', () => {
    const setupContract = getSetupContract(FuelGaugeProjectsEnum.TOKEN_CONTRACT);

    beforeAll(async () => {
      provider = await Provider.create(FUEL_NETWORK_URL);
    });

    const validateTransferOperation = (params: {
      operations: Operation[];
      sender: AbstractAddress;
      recipients: { address: AbstractAddress; quantities: { amount: number; assetId: string }[] }[];
      fromType: AddressType;
      toType: AddressType;
    }) => {
      const { operations, recipients, sender, fromType, toType } = params;

      recipients.forEach(({ address, quantities }, index) => {
        expect(operations[index].name).toBe(OperationName.transfer);
        expect(operations[index].from?.type).toBe(fromType);
        expect(operations[index].from?.address).toBe(sender.toB256());
        expect(operations[index].to?.type).toBe(toType);
        expect(operations[index].to?.address).toBe(address.toB256());
        expect(operations[index].assetsSent).toHaveLength(quantities.length);

        quantities.forEach(({ amount, assetId }, qunatitiesIndex) => {
          expect(Number(operations[index].assetsSent?.[qunatitiesIndex].amount)).toBe(amount);
          expect(operations[index].assetsSent?.[qunatitiesIndex].assetId).toBe(assetId);
        });
      });
    };

    it('should ensure transfer operation is assembled (ACCOUNT TRANSFER)', async () => {
      const wallet = await generateTestWallet(provider, [[10_000, BaseAssetId]]);

      const recipient = Wallet.generate({ provider });

      const amount = 1233;

      const tx1 = await wallet.transfer(recipient.address, amount, BaseAssetId);

      const { operations } = await tx1.waitForResult();

      expect(operations).toHaveLength(1);

      validateTransferOperation({
        operations,
        sender: wallet.address,
        fromType: AddressType.account,
        toType: AddressType.account,
        recipients: [
          { address: recipient.address, quantities: [{ amount, assetId: BaseAssetId }] },
        ],
      });
    });

    it('should ensure transfer operation is assembled (ACCOUNT TRANSFER TO CONTRACT)', async () => {
      const wallet = await generateTestWallet(provider, [
        [10_000, BaseAssetId],
        [10_000, ASSET_A],
      ]);

      const contract1 = await setupContract({ cache: false });

      const amount = 234;

      const tx1 = await wallet.transferToContract(contract1.id, amount, ASSET_A);

      const { operations } = await tx1.waitForResult();

      expect(operations).toHaveLength(1);

      validateTransferOperation({
        operations,
        sender: wallet.address,
        fromType: AddressType.account,
        toType: AddressType.contract,
        recipients: [{ address: contract1.id, quantities: [{ amount, assetId: ASSET_A }] }],
      });
    });

    it('should ensure transfer operation is assembled (CONTRACT TRANSFER TO ACCOUNT)', async () => {
      const wallet = await generateTestWallet(provider, [[10_000]]);

      const contract = await setupContract();
      contract.account = wallet;

      const recipient = Wallet.generate({ provider });
      const amount = 1055;

      const {
        transactionResult: { mintedAssets },
      } = await contract.functions.mint_coins(100000).call();

      const { assetId } = mintedAssets[0];

      const {
        transactionResult: { operations },
      } = await contract.functions
        .transfer_to_address({ value: recipient.address.toB256() }, { value: assetId }, amount)
        .call();

      validateTransferOperation({
        operations,
        sender: contract.id,
        fromType: AddressType.contract,
        toType: AddressType.account,
        recipients: [{ address: recipient.address, quantities: [{ amount, assetId }] }],
      });
    });

    it('should ensure transfer operations are assembled (CONTRACT TRANSFER TO ACCOUNTS)', async () => {
      const wallet = await generateTestWallet(provider, [
        [10_000, BaseAssetId],
        [10_000, ASSET_A],
        [10_000, ASSET_B],
      ]);

      const senderContract = await setupContract({ cache: false });
      senderContract.account = wallet;
      const fundAmount = 5_000;

      const assets = [BaseAssetId, ASSET_A, ASSET_B];
      for await (const asset of assets) {
        const tx = await wallet.transferToContract(senderContract.id, fundAmount, asset);
        await tx.waitForResult();
      }

      const transferData1 = {
        address: Wallet.generate({ provider }).address,
        quantities: [
          { amount: 543, assetId: ASSET_A },
          { amount: 400, assetId: ASSET_B },
          { amount: 123, assetId: BaseAssetId },
        ],
      };
      const transferData2 = {
        address: Wallet.generate({ provider }).address,
        quantities: [
          { amount: 12, assetId: BaseAssetId },
          { amount: 612, assetId: ASSET_B },
        ],
      };

      const {
        transactionResult: { operations },
      } = await senderContract.functions
        .multi_address_transfer([
          // 3 Transfers for recipient contract 1
          ...transferData1.quantities.map(({ amount, assetId }) => ({
            recipient: { value: transferData1.address.toB256() },
            asset_id: { value: assetId },
            amount,
          })),
          // 2 Transfers for recipient contract 2
          ...transferData2.quantities.map(({ amount, assetId }) => ({
            recipient: { value: transferData2.address.toB256() },
            asset_id: { value: assetId },
            amount,
          })),
        ])
        .call();

      validateTransferOperation({
        operations,
        sender: senderContract.id,
        fromType: AddressType.contract,
        toType: AddressType.account,
        recipients: [transferData1, transferData2],
      });
    });

    it('should ensure transfer operation is assembled (CONTRACT TRANSFER TO CONTRACT)', async () => {
      const wallet = await generateTestWallet(provider, [[10_000]]);

      const contractSender = await setupContract({ cache: false });
      contractSender.account = wallet;

      const contractRecipient = await setupContract({ cache: false });

      const {
        transactionResult: { mintedAssets },
      } = await contractSender.functions.mint_coins(100000).call();

      const amount = 2345;
      const { assetId } = mintedAssets[0];
      const {
        transactionResult: { operations },
      } = await contractSender.functions
        .transfer_to_contract(
          { value: contractRecipient.id.toB256() },
          { value: mintedAssets[0].assetId },
          amount
        )
        .call();

      validateTransferOperation({
        operations,
        sender: contractSender.id,
        fromType: AddressType.contract,
        toType: AddressType.contract,
        recipients: [{ address: contractRecipient.id, quantities: [{ amount, assetId }] }],
      });
    });

    it('should ensure transfer operations are assembled (CONTRACT TRANSFER TO CONTRACTS)', async () => {
      const wallet = await generateTestWallet(provider, [
        [10_000, BaseAssetId],
        [10_000, ASSET_A],
        [10_000, ASSET_B],
      ]);

      const senderContract = await setupContract({ cache: false });
      senderContract.account = wallet;
      const fundAmount = 5_000;

      const assets = [BaseAssetId, ASSET_A, ASSET_B];
      for await (const asset of assets) {
        const tx = await wallet.transferToContract(senderContract.id, fundAmount, asset);
        await tx.waitForResult();
      }

      const contractRecipient1 = await setupContract({ cache: false });
      const contractRecipient2 = await setupContract({ cache: false });

      const transferData1 = {
        address: contractRecipient1.id,
        quantities: [
          { amount: 300, assetId: ASSET_A },
          { amount: 400, assetId: ASSET_B },
        ],
      };
      const transferData2 = {
        address: contractRecipient2.id,
        quantities: [
          { amount: 500, assetId: ASSET_A },
          { amount: 700, assetId: ASSET_B },
          { amount: 100, assetId: BaseAssetId },
        ],
      };

      const {
        transactionResult: { operations },
      } = await senderContract.functions
        .multi_contract_transfer([
          // 2 Transfers for recipient contract 1
          ...transferData1.quantities.map(({ amount, assetId }) => ({
            recipient: { value: transferData1.address.toB256() },
            asset_id: { value: assetId },
            amount,
          })),
          // 3 Transfers for recipient contract 2
          ...transferData2.quantities.map(({ amount, assetId }) => ({
            recipient: { value: transferData2.address.toB256() },
            asset_id: { value: assetId },
            amount,
          })),
        ])
        .call();

      validateTransferOperation({
        operations,
        sender: senderContract.id,
        fromType: AddressType.contract,
        toType: AddressType.contract,
        recipients: [transferData1, transferData2],
      });
    });

    it('should ensure transfer operations are assembled (CUSTOM SCRIPT TRANSFER)', async () => {
      const wallet = await generateTestWallet(provider, [
        [10_000, BaseAssetId],
        [10_000, ASSET_A],
        [10_000, ASSET_B],
      ]);

      const recipient1Data = {
        address: Wallet.generate({ provider }).address,
        quantities: [{ amount: 250, assetId: ASSET_A }],
      };

      const recipient2Data = {
        address: Wallet.generate({ provider }).address,
        quantities: [
          { amount: 300, assetId: ASSET_A },
          { amount: 400, assetId: ASSET_B },
        ],
      };
      const recipient3Data = {
        address: Wallet.generate({ provider }).address,
        quantities: [
          { amount: 500, assetId: ASSET_A },
          { amount: 700, assetId: ASSET_B },
          { amount: 100, assetId: BaseAssetId },
        ],
      };

      const allRecipients = [recipient1Data, recipient2Data, recipient3Data];

      const request = new ScriptTransactionRequest();

      allRecipients.forEach(({ address, quantities }) => {
        quantities.forEach(({ amount, assetId }) => {
          request.addCoinOutput(address, amount, assetId);
        });
      });

      const {
        gasUsed,
        maxFee,
        requiredQuantities,
        inputsWithEstimatedPredicates,
        addedSignatures,
      } = await provider.getTransactionCost(request, []);

      request.gasLimit = gasUsed;
      request.maxFee = maxFee;

      await wallet.fund(
        request,
        requiredQuantities,
        maxFee,
        inputsWithEstimatedPredicates,
        addedSignatures
      );

      const tx = await wallet.sendTransaction(request);

      const { operations } = await tx.waitForResult();

      validateTransferOperation({
        operations,
        sender: wallet.address,
        fromType: AddressType.account,
        toType: AddressType.account,
        recipients: allRecipients,
      });
    });
  });
});
