import { generateTestWallet } from '@fuel-ts/account/test-utils';
import type { BigNumberish, Transaction, WalletUnlocked } from 'fuels';
import {
  ContractFactory,
  FUEL_NETWORK_URL,
  PolicyType,
  Provider,
  Script,
  ScriptTransactionRequest,
  Wallet,
  bn,
} from 'fuels';

import { getFuelGaugeForcProject, FuelGaugeProjectsEnum } from '../test/fixtures';

import { createSetupConfig } from './utils';

/**
 * @group node
 */
describe('Policies', () => {
  let provider: Provider;
  let wallet: WalletUnlocked;
  let baseAssetId: string;
  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
    wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);
  });

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
    expect(transaction.policies?.[2].type).toBe(PolicyType.Maturity);
    expect(transaction.policies?.[2]?.data).toBe(params.maturity);
    expect(transaction.policies?.[3].type).toBe(PolicyType.MaxFee);
    expect(bn(transaction.policies?.[3]?.data).lte(bn(params.maxFee))).toBeTruthy();
  };

  it('should ensure TX policies are properly set (ScriptTransactionRequest)', async () => {
    const receiver = Wallet.generate({ provider });

    const txParams: CustomTxParams = {
      tip: 10,
      maturity: randomNumber(1, 2),
      witnessLimit: randomNumber(800, 900),
      maxFee: 1000,
    };

    const txRequest = new ScriptTransactionRequest(txParams);

    txRequest.addCoinOutput(receiver.address, 500, baseAssetId);

    const txCost = await provider.getTransactionCost(txRequest);

    txRequest.gasLimit = txCost.gasUsed;
    txRequest.maxFee = txCost.maxFee;

    await wallet.fund(txRequest, txCost);

    const tx = await wallet.sendTransaction(txRequest);

    const { transaction } = await tx.waitForResult();

    expect(transaction.policyTypes).toBe(15);
    expect(transaction.policies?.length).toBe(4);

    validatePolicies({
      transaction,
      params: txRequest,
    });
  });

  it('should ensure TX policies are properly set (CreateTransactionRequest)', async () => {
    const { binHexlified, abiContents } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.SCRIPT_MAIN_ARGS
    );

    const factory = new ContractFactory(binHexlified, abiContents, wallet);

    const txParams: CustomTxParams = {
      tip: 11,
      witnessLimit: 2000,
      maturity: 1,
      maxFee: 5000,
    };

    const { transactionRequest: txRequest } = factory.createTransactionRequest(txParams);

    const txCost = await provider.getTransactionCost(txRequest);

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
    const { binHexlified, abiContents } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.PAYABLE_ANNOTATION
    );

    const contract = await createSetupConfig({
      contractBytecode: binHexlified,
      abi: abiContents,
      cache: true,
    })();

    const callScope = contract.functions.payable().txParams({
      tip: 5,
      maturity: randomNumber(1, 2),
      witnessLimit: randomNumber(800, 900),
      maxFee: 3000,
    });

    const txRequest = await callScope.getTransactionRequest();

    const {
      transactionResult: { transaction },
    } = await callScope.call();

    validatePolicies({
      transaction,
      params: txRequest,
    });
  });

  it('should ensure TX policies are properly set (ScriptInvocationScope)', async () => {
    const { binHexlified, abiContents } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.SCRIPT_MAIN_ARGS
    );

    const scriptInstance = new Script<BigNumberish[], BigNumberish>(
      binHexlified,
      abiContents,
      wallet
    );

    const callScope = scriptInstance.functions.main(33).txParams({
      tip: 2,
      maturity: randomNumber(1, 2),
      witnessLimit: randomNumber(800, 900),
      maxFee: 3000,
    });

    const txRequest = await callScope.getTransactionRequest();

    const {
      transactionResult: { transaction },
    } = await callScope.call();

    validatePolicies({
      transaction,
      params: txRequest,
    });
  });

  it('should ensure TX policies are properly set (Account Transfer)', async () => {
    const receiver = Wallet.generate({ provider });

    const txParams: CustomTxParams = {
      tip: 4,
      maturity: randomNumber(1, 2),
      witnessLimit: randomNumber(800, 900),
      maxFee: 3000,
    };

    const pendingTx = await wallet.transfer(receiver.address, 500, baseAssetId, txParams);

    const { transaction } = await pendingTx.waitForResult();

    validatePolicies({
      transaction,
      params: txParams,
    });
  });

  it('should ensure TX policies are properly set (Account Contract Transfer)', async () => {
    const { binHexlified, abiContents } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.PAYABLE_ANNOTATION
    );

    const contract = await createSetupConfig({
      contractBytecode: binHexlified,
      abi: abiContents,
      cache: true,
    })();

    const txParams: CustomTxParams = {
      tip: 1,
      maturity: randomNumber(1, 2),
      witnessLimit: randomNumber(800, 900),
      maxFee: 3000,
    };

    const pendingTx = await wallet.transferToContract(contract.id, 500, baseAssetId, txParams);

    const { transaction } = await pendingTx.waitForResult();

    validatePolicies({
      transaction,
      params: txParams,
    });
  });

  it('should ensure TX witnessLimit policy limits tx execution as expected', async () => {
    const receiver = Wallet.generate({ provider });

    const txParams: CustomTxParams = {
      maturity: randomNumber(1, 2),
      witnessLimit: 5,
    };

    await expect(async () => {
      const pendingTx = await wallet.transfer(receiver.address, 500, baseAssetId, txParams);

      await pendingTx.waitForResult();
    }).rejects.toThrow(/TransactionWitnessLimitExceeded/);
  });

  describe('should ensure TX maxFee policy limits TX execution as expected', () => {
    it('on account transfer', async () => {
      const receiver = Wallet.generate({ provider });

      const maxFee = 1;

      const txParams: CustomTxParams = {
        maturity: randomNumber(1, 2),
        witnessLimit: 800,
        maxFee,
      };

      await expect(async () => {
        const pendingTx = await wallet.transfer(receiver.address, 500, baseAssetId, txParams);
        await pendingTx.waitForResult();
      }).rejects.toThrow(new RegExp(`Max fee '${maxFee}' is lower than the required`));
    });

    it('on account transferring to contract', async () => {
      const maxFee = 1;

      const { binHexlified, abiContents } = getFuelGaugeForcProject(
        FuelGaugeProjectsEnum.PAYABLE_ANNOTATION
      );

      const contract = await createSetupConfig({
        contractBytecode: binHexlified,
        abi: abiContents,
        cache: true,
      })();

      const txParams: CustomTxParams = {
        maturity: randomNumber(1, 2),
        witnessLimit: 800,
        maxFee,
      };

      await expect(async () => {
        const pendingTx = await wallet.transferToContract(contract.id, 500, baseAssetId, txParams);
        await pendingTx.waitForResult();
      }).rejects.toThrow(new RegExp(`Max fee '${maxFee}' is lower than the required`));
    });

    it('on account withdraw to base layer', async () => {
      const maxFee = 1;
      const receiver = Wallet.generate({ provider });

      const txParams: CustomTxParams = {
        maturity: randomNumber(1, 2),
        witnessLimit: 800,
        maxFee,
      };

      await expect(async () => {
        const pendingTx = await wallet.withdrawToBaseLayer(receiver.address, 500, txParams);
        await pendingTx.waitForResult();
      }).rejects.toThrow(new RegExp(`Max fee '${maxFee}' is lower than the required`));
    });

    it('on ContractFactory when deploying contracts', async () => {
      const maxFee = 1;

      const { binHexlified, abiContents } = getFuelGaugeForcProject(
        FuelGaugeProjectsEnum.SCRIPT_MAIN_ARGS
      );

      const factory = new ContractFactory(binHexlified, abiContents, wallet);

      const txParams: CustomTxParams = {
        maturity: randomNumber(1, 2),
        witnessLimit: 800,
        maxFee,
      };

      await expect(async () => {
        await factory.deployContract(txParams);
      }).rejects.toThrow(new RegExp(`Max fee '${maxFee}' is lower than the required`));
    });

    it('on a contract call', async () => {
      const maxFee = 1;

      const { binHexlified, abiContents } = getFuelGaugeForcProject(
        FuelGaugeProjectsEnum.PAYABLE_ANNOTATION
      );

      const contract = await createSetupConfig({
        contractBytecode: binHexlified,
        abi: abiContents,
        cache: true,
      })();

      const txParams: CustomTxParams = {
        maturity: randomNumber(1, 2),
        witnessLimit: 800,
        maxFee,
      };

      await expect(async () => {
        await contract.functions.payable().txParams(txParams).call();
      }).rejects.toThrow(new RegExp(`Max fee '${maxFee}' is lower than the required`));
    });
  });
});
