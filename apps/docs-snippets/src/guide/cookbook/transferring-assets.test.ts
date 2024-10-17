import type { ContractTransferParams, ReceiptTransfer } from 'fuels';
import { BN, ReceiptType, Wallet } from 'fuels';
import { launchTestNode, TestAssetId } from 'fuels/test-utils';

import { CounterFactory, TokenFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Transferring Assets', () => {
  it('should successfully transfer asset to another account', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [sender],
    } = launched;
    // #region transferring-assets-1
    // #import { Wallet, BN };

    // #context const sender = Wallet.fromPrivateKey('...');
    const destination = Wallet.generate({
      provider: sender.provider,
    });
    const amountToTransfer = 500;

    const baseAssetId = sender.provider.getBaseAssetId();

    const response = await sender.transfer(destination.address, amountToTransfer, baseAssetId);

    await response.wait();

    // Retrieve balances
    const receiverBalance = await destination.getBalance(baseAssetId);

    // Validate new balance
    expect(new BN(receiverBalance).toNumber()).toEqual(amountToTransfer);
    // #endregion transferring-assets-1
  });

  it('should successfully prepare transfer to another account', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [sender],
    } = launched;
    const destination = Wallet.generate({
      provider: sender.provider,
    });

    const assetId = provider.getBaseAssetId();
    const amountToTransfer = 200;

    // #region transferring-assets-2
    const transactionRequest = await sender.createTransfer(
      destination.address,
      amountToTransfer,
      assetId
    );

    const chainId = provider.getChainId();

    const transactionId = transactionRequest.getTransactionId(chainId);

    const response = await sender.sendTransaction(transactionRequest);

    const { id } = await response.wait();

    // The transaction id should is the same as the one returned by the transaction request
    expect(id).toEqual(transactionId);
    // #endregion transferring-assets-2
  });

  it('should validate that modifying the transaction request will result in another TX ID', async () => {
    using launched = await launchTestNode({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '10ms'],
      },
    });
    const {
      provider,
      wallets: [sender],
    } = launched;
    const destination = Wallet.generate({
      provider: sender.provider,
    });

    const amountToTransfer = 200;
    const assetId = provider.getBaseAssetId();

    // #region transferring-assets-3
    const transactionRequest = await sender.createTransfer(
      destination.address,
      amountToTransfer,
      assetId
    );

    const chainId = provider.getChainId();

    const transactionId = transactionRequest.getTransactionId(chainId);

    transactionRequest.maturity = 1;

    const { maxFee } = await provider.estimateTxGasAndFee({ transactionRequest });

    transactionRequest.maxFee = maxFee;

    const response = await sender.sendTransaction(transactionRequest);

    const { id } = await response.wait();

    expect(id).not.toEqual(transactionId);
    // #endregion transferring-assets-3
  });

  it('should successfully transfer to contract', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CounterFactory,
        },
      ],
    });
    const {
      provider,
      wallets: [sender],
      contracts: [deployedContract],
    } = launched;
    // #region transferring-assets-4
    // #import { Wallet, BN };

    // #context const sender = Wallet.fromPrivateKey('...');

    const amountToTransfer = 400;
    const assetId = provider.getBaseAssetId();
    const contractId = deployedContract.id;

    const contractBalance = await deployedContract.getBalance(assetId);

    const tx = await sender.transferToContract(contractId, amountToTransfer, assetId);
    await tx.waitForResult();

    expect(new BN(contractBalance).toNumber()).toBe(0);
    expect(new BN(await deployedContract.getBalance(assetId)).toNumber()).toBe(amountToTransfer);
    // #endregion transferring-assets-4
  });

  it('should successfully batch transfer to contracts', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CounterFactory,
        },
        {
          factory: TokenFactory,
        },
      ],
    });
    const {
      provider,
      wallets: [sender],
      contracts: [contract1, contract2],
    } = launched;

    // #region transferring-assets-5
    const baseAssetId = provider.getBaseAssetId();
    const assetA = TestAssetId.A.value;

    const contractTransferParams: ContractTransferParams[] = [
      {
        contractId: contract1.id,
        amount: 999,
        assetId: baseAssetId,
      },
      {
        contractId: contract1.id,
        amount: 550,
        assetId: assetA,
      },
      {
        contractId: contract2.id,
        amount: 200,
        assetId: assetA,
      },
    ];

    const submit = await sender.batchTransferToContracts(contractTransferParams);
    const txResult = await submit.waitForResult();
    // #endregion transferring-assets-5

    const transferReceipts = txResult.receipts.filter(
      (receipt) => receipt.type === ReceiptType.Transfer
    ) as ReceiptTransfer[];

    expect(transferReceipts.length).toBe(contractTransferParams.length);
  });
});
