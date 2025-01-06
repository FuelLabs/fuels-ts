import type { BaseTransactionRequest, BigNumberish, Transaction } from 'fuels';
import {
  ContractFactory,
  CreateTransactionRequest,
  PolicyType,
  Script,
  ScriptTransactionRequest,
  Wallet,
  bn,
} from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { PayableAnnotation, PayableAnnotationFactory, ScriptMainArgs } from '../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Policies', () => {
  type CustomTxParams = {
    gasLimit?: BigNumberish;
    maturity?: number;
    tip?: BigNumberish;
    maxFee?: BigNumberish;
    witnessLimit?: BigNumberish;
  };

  const randomNumber = (minNumber: number, maxNumber: number) => {
    const randomValue = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
    return randomValue;
  };

  const validatePolicies = ({
    transaction,
    params,
  }: {
    transaction: Transaction;
    params: CustomTxParams;
  }) => {
    expect(transaction.policies?.[0].type).toBe(PolicyType.Tip);
    expect(bn(transaction.policies?.[0].data).eq(bn(params.tip))).toBeTruthy();
    expect(transaction.policies?.[1].type).toBe(PolicyType.WitnessLimit);
    expect(bn(transaction.policies?.[1].data).eq(bn(params.witnessLimit))).toBeTruthy();
    expect(transaction.policies?.[2].type).toBe(PolicyType.MaxFee);
    expect(bn(transaction.policies?.[2]?.data).lte(bn(params.maxFee))).toBeTruthy();
  };

  it('should ensure optional TX policies are not set when not informed', () => {
    let txRequest: BaseTransactionRequest = new ScriptTransactionRequest();

    txRequest = new ScriptTransactionRequest();

    expect(txRequest.tip).toBeUndefined();
    expect(txRequest.maturity).toBeUndefined();
    expect(txRequest?.witnessLimit).toBeUndefined();

    expect(txRequest.maxFee).toBeDefined();

    let tx = txRequest.toTransaction();

    // should only includes MaxFee which is a required policy
    expect(tx.policies.length).toBe(1);
    expect(tx.policyTypes).toBe(PolicyType.MaxFee);

    txRequest = new CreateTransactionRequest({ bytecodeWitnessIndex: 0 });

    expect(txRequest.tip).toBeUndefined();
    expect(txRequest.maturity).toBeUndefined();
    expect(txRequest?.witnessLimit).toBeUndefined();

    expect(txRequest.maxFee).toBeDefined();

    tx = txRequest.toTransaction();

    // should only includes MaxFee which is a required policy
    expect(tx.policies.length).toBe(1);
    expect(tx.policyTypes).toBe(PolicyType.MaxFee);
  });

  it('should ensure optional TX policies are not set with undesired values', () => {
    let txRequest: BaseTransactionRequest = new ScriptTransactionRequest({ tip: 0, maturity: 0 });

    txRequest = new ScriptTransactionRequest();

    expect(txRequest.tip).toBeUndefined();
    expect(txRequest.maturity).toBeUndefined();

    expect(txRequest.maxFee).toBeDefined();

    let tx = txRequest.toTransaction();

    // should only includes maxFee which is a required policy
    expect(tx.policies.length).toBe(1);
    expect(tx.policyTypes).toBe(PolicyType.MaxFee);

    txRequest = new CreateTransactionRequest({ tip: 0, maturity: 0, bytecodeWitnessIndex: 0 });

    expect(txRequest.tip).toBeUndefined();
    expect(txRequest.maturity).toBeUndefined();

    expect(txRequest.maxFee).toBeDefined();

    tx = txRequest.toTransaction();

    // should only includes maxFee which is a required policy
    expect(tx.policies.length).toBe(1);
    expect(tx.policyTypes).toBe(PolicyType.MaxFee);
  });

  it('should ensure TX policies are properly set (ScriptTransactionRequest)', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const receiver = Wallet.generate({ provider });

    const txParams: CustomTxParams = {
      tip: 10,
      witnessLimit: randomNumber(800, 900),
      maxFee: 1000,
    };

    const txRequest = new ScriptTransactionRequest(txParams);

    txRequest.addCoinOutput(receiver.address, 500, await provider.getBaseAssetId());

    await txRequest.autoCost(wallet);

    const tx = await wallet.sendTransaction(txRequest);

    const { transaction } = await tx.waitForResult();

    expect(transaction.policyTypes).toBe(11);
    expect(transaction.policies?.length).toBe(3);

    validatePolicies({
      transaction,
      params: txRequest,
    });
  });

  it('should ensure TX policies are properly set (CreateTransactionRequest)', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const txParams: CustomTxParams = {
      tip: 11,
      witnessLimit: 2000,
      maxFee: 70_000,
    };

    const factory = new ContractFactory(
      PayableAnnotationFactory.bytecode,
      PayableAnnotation.abi,
      wallet
    );

    const { transactionRequest: txRequest } = factory.createTransactionRequest(txParams);

    const txCost = await wallet.getTransactionCost(txRequest);

    txRequest.maxFee = txCost.maxFee;

    await wallet.fund(txRequest, txCost);

    const tx = await wallet.sendTransaction(txRequest);

    const { transaction } = await tx.waitForResult();

    validatePolicies({
      transaction,
      params: txParams,
    });
  });

  it('should ensure TX policies are properly set (BaseInvocationScope)', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: PayableAnnotationFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    const callScope = contract.functions.payable().txParams({
      tip: 5,

      witnessLimit: randomNumber(800, 900),
      maxFee: 70_000,
    });

    const txRequest = await callScope.getTransactionRequest();

    const { waitForResult } = await callScope.call();

    const {
      transactionResult: { transaction },
    } = await waitForResult();

    validatePolicies({
      transaction,
      params: txRequest,
    });
  });

  it('should ensure TX policies are properly set (ScriptInvocationScope)', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const scriptInstance = new Script<BigNumberish[], BigNumberish>(
      ScriptMainArgs.bytecode,
      ScriptMainArgs.abi,
      wallet
    );

    const callScope = scriptInstance.functions.main(33).txParams({
      tip: 2,

      witnessLimit: randomNumber(800, 900),
      maxFee: 70_000,
    });

    const txRequest = await callScope.getTransactionRequest();

    const { waitForResult } = await callScope.call();

    const {
      transactionResult: { transaction },
    } = await waitForResult();

    validatePolicies({
      transaction,
      params: txRequest,
    });
  });

  it('should ensure TX policies are properly set (Account Transfer)', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const receiver = Wallet.generate({ provider });

    const txParams: CustomTxParams = {
      tip: 4,

      witnessLimit: randomNumber(800, 900),
      maxFee: 70_000,
    };

    const pendingTx = await wallet.transfer(
      receiver.address,
      500,
      await provider.getBaseAssetId(),
      txParams
    );

    const { transaction } = await pendingTx.waitForResult();

    validatePolicies({
      transaction,
      params: txParams,
    });
  });

  it('should ensure TX policies are properly set (Account Contract Transfer)', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: PayableAnnotationFactory,
        },
      ],
    });

    const {
      provider,
      wallets: [wallet],
      contracts: [contract],
    } = launched;

    const txParams: CustomTxParams = {
      tip: 1,

      witnessLimit: randomNumber(800, 900),
      maxFee: 70_000,
    };

    const pendingTx = await wallet.transferToContract(
      contract.id,
      500,
      await provider.getBaseAssetId(),
      txParams
    );

    const { transaction } = await pendingTx.waitForResult();

    validatePolicies({
      transaction,
      params: txParams,
    });
  });

  it('should ensure TX witnessLimit policy limits tx execution as expected', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const receiver = Wallet.generate({ provider });

    const txParams: CustomTxParams = {
      witnessLimit: 0,
    };

    await expect(async () => {
      const pendingTx = await wallet.transfer(
        receiver.address,
        500,
        await provider.getBaseAssetId(),
        txParams
      );

      await pendingTx.waitForResult();
    }).rejects.toThrow(/TransactionWitnessLimitExceeded/);
  });

  describe('should ensure TX maxFee policy limits TX execution as expected', () => {
    it('on account transfer', async () => {
      using launched = await launchTestNode({
        nodeOptions: {
          args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
        },
      });

      const {
        provider,
        wallets: [wallet],
      } = launched;

      const receiver = Wallet.generate({ provider });

      const maxFee = 0;

      const txParams: CustomTxParams = {
        witnessLimit: 800,
        maxFee,
      };

      await expect(async () => {
        const pendingTx = await wallet.transfer(
          receiver.address,
          500,
          await provider.getBaseAssetId(),
          txParams
        );
        await pendingTx.waitForResult();
      }).rejects.toThrow(new RegExp(`Max fee '${maxFee}' is lower than the required`));
    });

    it('on account transferring to contract', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [
          {
            factory: PayableAnnotationFactory,
          },
        ],
      });

      const {
        provider,
        contracts: [contract],
        wallets: [wallet],
      } = launched;

      const maxFee = 0;

      const txParams: CustomTxParams = {
        witnessLimit: 800,
        maxFee,
      };

      await expect(async () => {
        const pendingTx = await wallet.transferToContract(
          contract.id,
          500,
          await provider.getBaseAssetId(),
          txParams
        );
        await pendingTx.waitForResult();
      }).rejects.toThrow(new RegExp(`Max fee '${maxFee}' is lower than the required`));
    });

    it('on account withdraw to base layer', async () => {
      using launched = await launchTestNode({
        nodeOptions: {
          args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
        },
      });

      const {
        provider,
        wallets: [wallet],
      } = launched;

      const maxFee = 0;
      const receiver = Wallet.generate({ provider });

      const txParams: CustomTxParams = {
        witnessLimit: 800,
        maxFee,
      };

      await expect(async () => {
        const pendingTx = await wallet.withdrawToBaseLayer(receiver.address, 500, txParams);
        await pendingTx.waitForResult();
      }).rejects.toThrow(new RegExp(`Max fee '${maxFee}' is lower than the required`));
    });

    it('on ContractFactory when deploying contracts', async () => {
      using launched = await launchTestNode({
        nodeOptions: {
          args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
        },
      });

      const {
        wallets: [wallet],
      } = launched;

      const maxFee = 0;

      const factory = new ContractFactory(
        PayableAnnotationFactory.bytecode,
        PayableAnnotation.abi,
        wallet
      );

      const txParams: CustomTxParams = {
        witnessLimit: 800,
        maxFee,
      };

      await expect(async () => {
        await factory.deploy(txParams);
      }).rejects.toThrow(new RegExp(`Max fee '${maxFee}' is lower than the required`));
    });

    it('on a contract call', async () => {
      const maxFee = 0;

      using launched = await launchTestNode({
        contractsConfigs: [
          {
            factory: PayableAnnotationFactory,
          },
        ],
      });

      const {
        contracts: [contract],
      } = launched;

      const txParams: CustomTxParams = {
        witnessLimit: 800,
        maxFee,
      };

      await expect(async () => {
        await contract.functions.payable().txParams(txParams).call();
      }).rejects.toThrow(new RegExp(`Max fee '${maxFee}' is lower than the required`));
    });
  });
});
