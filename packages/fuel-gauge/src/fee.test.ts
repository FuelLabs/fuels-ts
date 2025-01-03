import {
  ContractFactory,
  InputMessageCoder,
  ScriptTransactionRequest,
  Wallet,
  getMintedAssetId,
  getRandomB256,
  hexlify,
  isCoin,
} from 'fuels';
import type { BN } from 'fuels';
import { launchTestNode, ASSET_A, ASSET_B, expectToBeInRange, TestMessage } from 'fuels/test-utils';

import {
  CallTestContractFactory,
  MultiTokenContract,
  MultiTokenContractFactory,
} from '../test/typegen/contracts';
import type { AddressInput } from '../test/typegen/contracts/MultiTokenContract';
import { PredicateU32 } from '../test/typegen/predicates/PredicateU32';

/**
 * @group node
 * @group browser
 */
describe('Fee', () => {
  const expectFeeInMarginOfError = (fee: BN, expectedFee: BN) => {
    const feeNumber = fee.toNumber();
    const expectedFeeNumber = expectedFee.toNumber();
    switch (feeNumber) {
      case expectedFeeNumber:
      case expectedFeeNumber + 1:
      case expectedFeeNumber - 1:
        return true;
      default:
        throw new Error(
          `Expected fee: '${feeNumber}' to be within margin of error: '${expectedFeeNumber - 1}-${
            expectedFeeNumber + 1
          }'`
        );
    }
  };

  const SUB_ID = '0x4a778acfad1abc155a009dc976d2cf0db6197d3d360194d74b1fb92b96986b00';

  it('should ensure fee is properly calculated when minting and burning coins', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: MultiTokenContractFactory,
        },
      ],
    });

    const {
      contracts: [contract],
      wallets: [wallet],
    } = launched;

    // minting coins
    let balanceBefore = await wallet.getBalance();

    const subId = '0x4a778acfad1abc155a009dc976d2cf0db6197d3d360194d74b1fb92b96986b00';

    const call1 = await contract.functions.mint_coins(subId, 1_000).call();
    const {
      transactionResult: { fee: fee1 },
    } = await call1.waitForResult();

    let balanceAfter = await wallet.getBalance();

    let balanceDiff = balanceBefore.sub(balanceAfter);

    expect(expectFeeInMarginOfError(fee1, balanceDiff)).toBeTruthy();

    // burning coins
    balanceBefore = await wallet.getBalance();

    const call2 = await contract.functions.mint_coins(subId, 1_000).call();

    const {
      transactionResult: { fee: fee2 },
    } = await call2.waitForResult();

    balanceAfter = await wallet.getBalance();

    balanceDiff = balanceBefore.sub(balanceAfter);

    expect(expectFeeInMarginOfError(fee2, balanceDiff)).toBeTruthy();
  });

  it('should ensure fee is properly calculated on simple transfer transactions', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const destination = Wallet.generate({ provider });

    const amountToTransfer = 120;
    const balanceBefore = await wallet.getBalance();

    const tx = await wallet.transfer(
      destination.address,
      amountToTransfer,
      provider.getBaseAssetId(),
      {
        gasLimit: 10_000,
      }
    );
    const { fee } = await tx.wait();

    const balanceAfter = await wallet.getBalance();
    const balanceDiff = balanceBefore.sub(amountToTransfer).sub(balanceAfter).toNumber();

    expectToBeInRange({
      value: fee.toNumber(),
      min: balanceDiff - 1,
      max: balanceDiff + 1,
    });
  });

  it('should ensure fee is properly calculated on multi transfer transactions', async () => {
    using launched = await launchTestNode({
      walletsConfig: {
        count: 4,
      },
    });

    const {
      provider,
      wallets: [wallet, destination1, destination2, destination3],
    } = launched;

    const amountToTransfer = 120;
    const balanceBefore = await wallet.getBalance();

    const request = new ScriptTransactionRequest({
      gasLimit: 10000,
    });

    request.addCoinOutput(destination1.address, amountToTransfer, provider.getBaseAssetId());
    request.addCoinOutput(destination2.address, amountToTransfer, ASSET_A);
    request.addCoinOutput(destination3.address, amountToTransfer, ASSET_B);

    await request.autoCost(wallet);

    const tx = await wallet.sendTransaction(request);
    const { fee } = await tx.wait();

    const balanceAfter = await wallet.getBalance();
    const balanceDiff = balanceBefore.sub(amountToTransfer).sub(balanceAfter).toNumber();

    expectToBeInRange({
      value: fee.toNumber(),
      min: balanceDiff - 1,
      max: balanceDiff + 1,
    });
  });

  it('should ensure fee is properly calculated on a contract deploy', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const balanceBefore = await wallet.getBalance();

    const factory = new ContractFactory(
      MultiTokenContractFactory.bytecode,
      MultiTokenContract.abi,
      wallet
    );
    const { transactionRequest } = factory.createTransactionRequest();
    const txCost = await wallet.getTransactionCost(transactionRequest);

    transactionRequest.maxFee = txCost.maxFee;

    await wallet.fund(transactionRequest, txCost);

    const tx = await wallet.sendTransaction(transactionRequest);
    const { fee } = await tx.wait();

    const balanceAfter = await wallet.getBalance();
    const balanceDiff = balanceBefore.sub(balanceAfter).toNumber();

    expectToBeInRange({
      value: fee.toNumber(),
      min: balanceDiff - 1,
      max: balanceDiff + 1,
    });
  });

  it('should ensure fee is properly calculated on a contract call', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CallTestContractFactory,
        },
      ],
    });

    const {
      contracts: [contract],
      wallets: [wallet],
    } = launched;

    const balanceBefore = await wallet.getBalance();

    const { waitForResult } = await contract.functions.sum_multparams(1, 2, 3, 4, 5).call();

    const {
      transactionResult: { fee },
    } = await waitForResult();

    const balanceAfter = await wallet.getBalance();
    const balanceDiff = balanceBefore.sub(balanceAfter).toNumber();

    expectToBeInRange({
      value: fee.toNumber(),
      min: balanceDiff - 1,
      max: balanceDiff + 1,
    });
  });

  it('should ensure fee is properly calculated a contract multi call', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CallTestContractFactory,
        },
      ],
    });

    const {
      contracts: [contract],
      wallets: [wallet],
    } = launched;

    const balanceBefore = await wallet.getBalance();

    const scope = contract.multiCall([
      contract.functions.sum_multparams(1, 2, 3, 4, 5),
      contract.functions.return_void(),
      contract.functions.empty(),
      contract.functions.return_bytes(),
    ]);

    const { waitForResult } = await scope.call();

    const {
      transactionResult: { fee },
    } = await waitForResult();

    const balanceAfter = await wallet.getBalance();
    const balanceDiff = balanceBefore.sub(balanceAfter).toNumber();

    expectToBeInRange({
      value: fee.toNumber(),
      min: balanceDiff - 1,
      max: balanceDiff + 1,
    });
  });

  it('should ensure fee is properly calculated in a multi call [MINT TO 15 ADDRESSES]', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: MultiTokenContractFactory,
        },
      ],
    });

    const {
      contracts: [contract],
      wallets: [wallet],
    } = launched;

    const subId = '0x4a778acfad1abc155a009dc976d2cf0db6197d3d360194d74b1fb92b96986b00';

    const genAddresses = () => Array.from({ length: 3 }, () => ({ bits: getRandomB256() }));

    const addresses = genAddresses() as [AddressInput, AddressInput, AddressInput];

    const calls = Array.from({ length: 15 }).map(() =>
      contract.functions.mint_to_addresses(addresses, subId, 100)
    );

    const balanceBefore = await wallet.getBalance();

    const { waitForResult } = await contract
      .multiCall(calls)
      .txParams({ variableOutputs: calls.length * 3 })
      .call();

    const {
      transactionResult: { fee },
    } = await waitForResult();

    const balanceAfter = await wallet.getBalance();

    const balanceDiff = balanceBefore.sub(balanceAfter).toNumber();

    expectToBeInRange({
      value: fee.toNumber(),
      min: balanceDiff - 1,
      max: balanceDiff + 1,
    });
  });

  it('should ensure fee is properly calculated on transactions with predicate', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const predicate = new PredicateU32({ provider, data: [1078] });

    const tx1 = await wallet.transfer(predicate.address, 1_000_000, provider.getBaseAssetId());
    await tx1.wait();

    const transferAmount = 100;
    const balanceBefore = await predicate.getBalance();
    const tx2 = await predicate.transfer(wallet.address, transferAmount, provider.getBaseAssetId());

    const { fee } = await tx2.wait();

    const balanceAfter = await predicate.getBalance();
    const balanceDiff = balanceBefore.sub(balanceAfter).sub(transferAmount).toNumber();

    expectToBeInRange({
      value: fee.toNumber(),
      min: balanceDiff - 20,
      max: balanceDiff + 20,
    });
  });

  describe('Estimation with Message containing data within TX request inputs', () => {
    // Message with data and amount
    const testMessage1 = new TestMessage({
      data: hexlify(InputMessageCoder.encodeData('0x09')),
      amount: 100_000_000,
    });

    // Message with data and without amount
    const testMessage2 = new TestMessage({
      data: hexlify(InputMessageCoder.encodeData('0x10')),
      amount: 0,
    });

    it('should not fail [W/ UTXO within inputs]', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [
          {
            factory: CallTestContractFactory,
          },
        ],
        walletsConfig: {
          count: 2,
          messages: [testMessage1, testMessage2],
        },
      });

      const {
        provider,
        contracts: [contract],
        wallets: [fundedWallet],
      } = launched;

      const baseAssetId = provider.getBaseAssetId();

      const {
        messages: [message1, message2],
      } = await fundedWallet.getMessages();

      const request = await contract.functions.foo(10).getTransactionRequest();

      const resources = await fundedWallet.getResourcesToSpend([[1000, baseAssetId]]);

      // Should include only UTXOs resources
      expect(resources.every(isCoin)).toBeTruthy();

      request.addMessageInput(message1);
      request.addMessageInput(message2);
      request.addResources(resources);

      const cost = await fundedWallet.getTransactionCost(request);

      expect(cost.dryRunStatus?.type).toBe('DryRunSuccessStatus');
    });

    it('should not fail [W/out UTXO within inputs]', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [
          {
            factory: CallTestContractFactory,
          },
        ],
        walletsConfig: {
          count: 2,
          messages: [testMessage1, testMessage2],
        },
      });

      const {
        provider,
        contracts: [contract],
        wallets: [fundedWallet],
      } = launched;

      const baseAssetId = provider.getBaseAssetId();

      const {
        messages: [message1, message2],
      } = await fundedWallet.getMessages();

      const request = await contract.functions.foo(10).getTransactionRequest();

      request.addCoinOutput(fundedWallet.address, 1000, baseAssetId);
      request.addMessageInput(message1);
      request.addMessageInput(message2);

      const cost = await fundedWallet.getTransactionCost(request);

      expect(cost.dryRunStatus?.type).toBe('DryRunSuccessStatus');
    });

    it('should not run estimateGasPrice in between estimateTxDependencies dry run attempts', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [
          {
            factory: MultiTokenContractFactory,
          },
        ],
      });

      const {
        contracts: [contract],
        wallets: [wallet],
        provider,
      } = launched;

      const assetId = getMintedAssetId(contract.id.toB256(), SUB_ID);

      // Minting coins first
      const mintCall = await contract.functions.mint_coins(SUB_ID, 10_000).call();
      await mintCall.waitForResult();

      const estimateGasPrice = vi.spyOn(provider, 'estimateGasPrice');
      const dryRun = vi.spyOn(provider.operations, 'dryRun');

      /**
       * Sway transfer without adding `OutputVariable` which will result in
       * 2 dry runs at the `Provider.estimateTxDependencies` method:
       * - 1st dry run will fail due to missing `OutputVariable`
       * - 2nd dry run will succeed
       */
      const transferCall = await contract.functions
        .transfer_to_address({ bits: wallet.address.toB256() }, { bits: assetId }, 10_000)
        .call();

      await transferCall.waitForResult();

      expect(estimateGasPrice).toHaveBeenCalledOnce();
      expect(dryRun).toHaveBeenCalledTimes(2);
    });

    it('should ensure estimateGasPrice runs only once when funding a transaction.', async () => {
      const amountPerCoin = 100;

      using launched = await launchTestNode({
        walletsConfig: {
          amountPerCoin, // Funding with multiple UTXOs so the fee will change after funding the TX.
          coinsPerAsset: 250,
        },
        contractsConfigs: [
          {
            factory: MultiTokenContractFactory,
          },
        ],
      });

      const {
        wallets: [wallet],
        provider,
      } = launched;

      const fund = vi.spyOn(wallet, 'fund');
      const estimateGasPrice = vi.spyOn(provider, 'estimateGasPrice');

      const tx = await wallet.transfer(
        wallet.address,
        amountPerCoin * 20,
        provider.getBaseAssetId()
      );
      const { isStatusSuccess } = await tx.waitForResult();

      expect(fund).toHaveBeenCalledOnce();
      expect(estimateGasPrice).toHaveBeenCalledOnce();

      expect(isStatusSuccess).toBeTruthy();
    });
  });
});
