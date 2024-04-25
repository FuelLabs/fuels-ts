import { generateTestWallet } from '@fuel-ts/account/test-utils';
import { ASSET_A, ASSET_B, expectToBeInRange } from '@fuel-ts/utils/test-utils';
import type { BN, BaseWalletUnlocked, CoinQuantityLike } from 'fuels';
import {
  BaseAssetId,
  ContractFactory,
  FUEL_NETWORK_URL,
  Predicate,
  Provider,
  ScriptTransactionRequest,
  Wallet,
  bn,
  getRandomB256,
} from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

/**
 * @group node
 */
describe('Fee', () => {
  let wallet: BaseWalletUnlocked;
  let provider: Provider;
  let minGasPrice: number;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    minGasPrice = provider.getGasConfig().minGasPrice.toNumber();
    wallet = await generateTestWallet(provider, [
      [1_000_000_000],
      [1_000_000_000, ASSET_A],
      [1_000_000_000, ASSET_B],
    ]);
  });

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

  const randomGasPrice = (minValue: number, maxValue: number) => {
    const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
    return bn(randomValue);
  };

  it('should ensure fee is properly calculated when minting and burning coins', async () => {
    const { binHexlified, abiContents } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.MULTI_TOKEN_CONTRACT
    );

    const factory = new ContractFactory(binHexlified, abiContents, wallet);
    const contract = await factory.deployContract({ gasPrice: minGasPrice });

    // minting coins
    let balanceBefore = await wallet.getBalance();

    let gasPrice = randomGasPrice(minGasPrice, 7);

    const subId = '0x4a778acfad1abc155a009dc976d2cf0db6197d3d360194d74b1fb92b96986b00';

    const {
      transactionResult: { fee: fee1 },
    } = await contract.functions.mint_coins(subId, 1_000).txParams({ gasPrice }).call();

    let balanceAfter = await wallet.getBalance();

    let balanceDiff = balanceBefore.sub(balanceAfter);

    expect(expectFeeInMarginOfError(fee1, balanceDiff)).toBeTruthy();

    // burning coins
    balanceBefore = await wallet.getBalance();

    gasPrice = randomGasPrice(minGasPrice, 7);

    const {
      transactionResult: { fee: fee2 },
    } = await contract.functions.mint_coins(subId, 1_000).txParams({ gasPrice }).call();

    balanceAfter = await wallet.getBalance();

    balanceDiff = balanceBefore.sub(balanceAfter);

    expect(expectFeeInMarginOfError(fee2, balanceDiff)).toBeTruthy();
  });

  it('should ensure fee is properly calculated on simple transfer transactions', async () => {
    const destination = Wallet.generate({ provider });

    const amountToTransfer = 120;
    const balanceBefore = await wallet.getBalance();

    const gasPrice = randomGasPrice(minGasPrice, 7);

    const tx = await wallet.transfer(destination.address, amountToTransfer, BaseAssetId, {
      gasPrice,
      gasLimit: 10_000,
    });
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
    const destination1 = Wallet.generate({ provider });
    const destination2 = Wallet.generate({ provider });
    const destination3 = Wallet.generate({ provider });

    const amountToTransfer = 120;
    const gasPrice = randomGasPrice(minGasPrice, 7);
    const balanceBefore = await wallet.getBalance();

    const request = new ScriptTransactionRequest({
      gasPrice,
      gasLimit: 10000,
    });

    request.addCoinOutput(destination1.address, amountToTransfer, BaseAssetId);
    request.addCoinOutput(destination2.address, amountToTransfer, ASSET_A);
    request.addCoinOutput(destination3.address, amountToTransfer, ASSET_B);

    const quantities: CoinQuantityLike[] = [
      [20_000 + amountToTransfer, BaseAssetId],
      [amountToTransfer, ASSET_A],
      [amountToTransfer, ASSET_B],
    ];

    const resources = await wallet.getResourcesToSpend(quantities);

    request.addResources(resources);

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
    const { binHexlified, abiContents } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.MULTI_TOKEN_CONTRACT
    );

    const balanceBefore = await wallet.getBalance();

    const gasPrice = randomGasPrice(minGasPrice, 7);
    const factory = new ContractFactory(binHexlified, abiContents, wallet);
    const { transactionRequest } = factory.createTransactionRequest({ gasPrice });
    const { maxFee, requiredQuantities } = await provider.getTransactionCost(transactionRequest);

    await wallet.fund(transactionRequest, requiredQuantities, maxFee);

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
    const { binHexlified, abiContents } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.CALL_TEST_CONTRACT
    );

    const factory = new ContractFactory(binHexlified, abiContents, wallet);
    const contract = await factory.deployContract({ gasPrice: minGasPrice });

    const gasPrice = randomGasPrice(minGasPrice, 7);
    const balanceBefore = await wallet.getBalance();

    const {
      transactionResult: { fee },
    } = await contract.functions
      .sum_multparams(1, 2, 3, 4, 5)
      .txParams({
        gasPrice,
      })
      .call();

    const balanceAfter = await wallet.getBalance();
    const balanceDiff = balanceBefore.sub(balanceAfter).toNumber();

    expectToBeInRange({
      value: fee.toNumber(),
      min: balanceDiff - 1,
      max: balanceDiff + 1,
    });
  });

  it('should ensure fee is properly calculated a contract multi call', async () => {
    const { binHexlified, abiContents } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.CALL_TEST_CONTRACT
    );

    const factory = new ContractFactory(binHexlified, abiContents, wallet);
    const contract = await factory.deployContract({ gasPrice: minGasPrice });

    const gasPrice = randomGasPrice(minGasPrice, 7);
    const balanceBefore = await wallet.getBalance();

    const scope = contract
      .multiCall([
        contract.functions.sum_multparams(1, 2, 3, 4, 5),
        contract.functions.return_void(),
        contract.functions.empty(),
        contract.functions.return_bytes(),
      ])
      .txParams({
        gasPrice,
        gasLimit: 10000,
      });

    const {
      transactionResult: { fee },
    } = await scope.call();

    const balanceAfter = await wallet.getBalance();
    const balanceDiff = balanceBefore.sub(balanceAfter).toNumber();

    expectToBeInRange({
      value: fee.toNumber(),
      min: balanceDiff - 1,
      max: balanceDiff + 1,
    });
  });

  it('should ensure fee is properly calculated in a multi call [MINT TO 15 ADDRESSES]', async () => {
    const { binHexlified, abiContents } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.MULTI_TOKEN_CONTRACT
    );

    const factory = new ContractFactory(binHexlified, abiContents, wallet);
    const contract = await factory.deployContract({ gasPrice: minGasPrice });

    const subId = '0x4a778acfad1abc155a009dc976d2cf0db6197d3d360194d74b1fb92b96986b00';

    const genAddresses = () => Array.from({ length: 3 }, () => ({ value: getRandomB256() }));

    const calls = Array.from({ length: 15 }).map(() =>
      contract.functions.mint_to_addresses(genAddresses(), subId, 100)
    );

    const balanceBefore = await wallet.getBalance();

    const {
      transactionResult: { fee },
    } = await contract
      .multiCall(calls)
      .txParams({ variableOutputs: calls.length * 3 })
      .call();

    const balanceAfter = await wallet.getBalance();

    const balanceDiff = balanceBefore.sub(balanceAfter).toNumber();

    expectToBeInRange({
      value: fee.toNumber(),
      min: balanceDiff - 1,
      max: balanceDiff + 1,
    });
  });

  it('should ensure fee is properly calculated on transactions with predicate', async () => {
    const { binHexlified, abiContents } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.PREDICATE_TRUE
    );

    const predicate = new Predicate({
      bytecode: binHexlified,
      abi: abiContents,
      provider,
    });

    const tx1 = await wallet.transfer(predicate.address, 1_500_000, BaseAssetId, {
      gasPrice: minGasPrice,
      gasLimit: 10_000,
    });
    await tx1.wait();

    const transferAmount = 100;
    const balanceBefore = await predicate.getBalance();
    const gasPrice = randomGasPrice(minGasPrice, 9);
    const tx2 = await predicate.transfer(wallet.address, transferAmount, BaseAssetId, {
      gasPrice,
      gasLimit: 10_000,
    });

    const { fee } = await tx2.wait();

    const balanceAfter = await predicate.getBalance();
    const balanceDiff = balanceBefore.sub(balanceAfter).sub(transferAmount).toNumber();

    expectToBeInRange({
      value: fee.toNumber(),
      min: balanceDiff - 1,
      max: balanceDiff + 1,
    });
  });
});
