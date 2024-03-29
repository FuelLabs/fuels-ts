import { generateTestWallet } from '@fuel-ts/account/test-utils';
import type { BigNumberish, Transaction } from 'fuels';
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
  let baseAssetId: string;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
  });

  type CustomTxParams = {
    gasPrice: BigNumberish;
    gasLimit?: BigNumberish;
    maturity?: number;
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
    expect(transaction.policies?.[0].type).toBe(PolicyType.GasPrice);
    expect(bn(transaction.policies?.[0].data).eq(params.gasPrice)).toBeTruthy();
    expect(transaction.policies?.[1].type).toBe(PolicyType.WitnessLimit);
    expect(bn(transaction.policies?.[1].data).eq(bn(params.witnessLimit))).toBeTruthy();
    expect(transaction.policies?.[2].type).toBe(PolicyType.Maturity);
    expect(transaction.policies?.[2]?.data).toBe(params.maturity);
    expect(transaction.policies?.[3].type).toBe(PolicyType.MaxFee);
    expect(bn(transaction.policies?.[3].data).eq(bn(params.maxFee))).toBeTruthy();
  };

  it('should ensure TX policies are properly set (ScriptTransactionRequest)', async () => {
    const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);
    const receiver = Wallet.generate({ provider });

    const txRequest = new ScriptTransactionRequest({
      gasLimit: randomNumber(800, 1_000),
      maturity: randomNumber(1, 2),
      gasPrice: randomNumber(1, 3),
      witnessLimit: randomNumber(800, 900),
      maxFee: randomNumber(9_000, 10_000),
    });

    txRequest.addCoinOutput(receiver.address, 500, baseAssetId);

    const { gasUsed, maxFee, requiredQuantities } = await provider.getTransactionCost(txRequest);

    txRequest.gasLimit = gasUsed;

    await wallet.fund(txRequest, requiredQuantities, maxFee);

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

    const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);

    const factory = new ContractFactory(binHexlified, abiContents, wallet);

    const { transactionRequest: txRequest } = factory.createTransactionRequest({
      maturity: randomNumber(1, 2),
      gasPrice: randomNumber(1, 3),
      witnessLimit: randomNumber(800, 900),
      maxFee: randomNumber(9_000, 10_000),
    });

    const { maxFee, requiredQuantities } = await provider.getTransactionCost(txRequest);

    await wallet.fund(txRequest, requiredQuantities, maxFee);

    const tx = await wallet.sendTransaction(txRequest);

    const { transaction } = await tx.waitForResult();

    validatePolicies({
      transaction,
      params: txRequest,
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
      gasLimit: randomNumber(800, 1_000),
      maturity: randomNumber(1, 2),
      gasPrice: randomNumber(1, 3),
      witnessLimit: randomNumber(800, 900),
      maxFee: randomNumber(9_000, 10_000),
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
    const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);

    const scriptInstance = new Script<BigNumberish[], BigNumberish>(
      binHexlified,
      abiContents,
      wallet
    );

    const callScope = scriptInstance.functions.main(33).txParams({
      gasLimit: randomNumber(800, 1_000),
      maturity: randomNumber(1, 2),
      gasPrice: randomNumber(1, 3),
      witnessLimit: randomNumber(800, 900),
      maxFee: randomNumber(9_000, 10_000),
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
    const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);
    const receiver = Wallet.generate({ provider });

    const txParams: CustomTxParams = {
      gasLimit: randomNumber(800, 1_000),
      maturity: randomNumber(1, 2),
      gasPrice: randomNumber(1, 3),
      witnessLimit: randomNumber(800, 900),
      maxFee: randomNumber(9_000, 10_000),
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

    const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);

    const txParams: CustomTxParams = {
      gasLimit: randomNumber(800, 1_000),
      maturity: randomNumber(1, 2),
      gasPrice: randomNumber(1, 3),
      witnessLimit: randomNumber(800, 900),
      maxFee: randomNumber(9_000, 10_000),
    };

    const pendingTx = await wallet.transferToContract(contract.id, 500, baseAssetId, txParams);

    const { transaction } = await pendingTx.waitForResult();

    validatePolicies({
      transaction,
      params: txParams,
    });
  });

  it('should ensure TX witnessLimit rule limits tx execution as expected', async () => {
    const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);
    const receiver = Wallet.generate({ provider });

    const txParams: CustomTxParams = {
      gasLimit: randomNumber(800, 1_000),
      maturity: randomNumber(1, 2),
      gasPrice: randomNumber(1, 3),
      witnessLimit: 5,
      maxFee: randomNumber(9_000, 10_000),
    };

    await expect(async () => {
      const pendingTx = await wallet.transfer(receiver.address, 500, baseAssetId, txParams);

      await pendingTx.waitForResult();
    }).rejects.toThrow(/TransactionWitnessLimitExceeded/);
  });

  it('should ensure TX maxFee rule limits tx execution as Expected', async () => {
    const wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);
    const receiver = Wallet.generate({ provider });

    const txParams: CustomTxParams = {
      gasLimit: randomNumber(800, 1_000),
      maturity: randomNumber(1, 2),
      gasPrice: randomNumber(1, 3),
      witnessLimit: randomNumber(800, 900),
      maxFee: 5,
    };

    await expect(async () => {
      const pendingTx = await wallet.transfer(receiver.address, 500, baseAssetId, txParams);

      await pendingTx.waitForResult();
    }).rejects.toThrow(/TransactionMaxFeeLimitExceeded/);
  });
});
