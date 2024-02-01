import { generateTestWallet } from '@fuel-ts/account/test-utils';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import type { AssetId, BN } from 'fuels';
import { toHex, Provider, Wallet, ContractFactory, bn, BaseAssetId, FUEL_NETWORK_URL } from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

const { binHexlified: bytecode, abiContents: abi } = getFuelGaugeForcProject(
  FuelGaugeProjectsEnum.TOKEN_CONTRACT
);

let provider: Provider;

const setup = async () => {
  // Create wallet
  const wallet = await generateTestWallet(provider, [[5_000_000, BaseAssetId]]);
  const { minGasPrice } = wallet.provider.getGasConfig();

  // Deploy contract
  const factory = new ContractFactory(bytecode, abi, wallet);
  const contract = await factory.deployContract({ gasPrice: minGasPrice });

  return contract;
};

let gasPrice: BN;

beforeAll(async () => {
  provider = await Provider.create(FUEL_NETWORK_URL);
  gasPrice = provider.getGasConfig().minGasPrice;
});

/**
 * @group node
 */
describe('TokenTestContract', () => {
  it('Can mint and transfer coins', async () => {
    // New wallet to transfer coins and check balance
    const userWallet = Wallet.generate({ provider });
    const token = await setup();
    const tokenContractId = { value: token.id.toB256() };
    const addressId = { value: userWallet.address.toB256() };

    // Mint some coins
    const { transactionResult } = await token.functions
      .mint_coins(100)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    const { mintedAssets } = transactionResult;

    const assetId: AssetId = { value: mintedAssets?.[0].assetId };

    const getBalance = async () => {
      const { value } = await token.functions
        .get_balance(tokenContractId, assetId)
        .txParams({ gasLimit: 10_000 })
        .simulate<BN>();
      return value;
    };
    // Check balance is correct
    await token.functions.mint_coins(100).txParams({ gasPrice, gasLimit: 10_000 }).call();

    expect((await getBalance()).toHex()).toEqual(toHex(200));

    // Transfer some coins
    await token.functions
      .transfer_coins_to_output(addressId, assetId, 50)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    // Check new wallet received the coins from the token contract
    const balances = await userWallet.getBalances();
    const tokenBalance = balances.find((b) => b.assetId === assetId.value);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(50));
  });

  it.only('Automatically add variableOuputs', async () => {
    const [wallet1, wallet2, wallet3] = Array.from({ length: 3 }, () =>
      Wallet.generate({ provider })
    );

    const addresses = [wallet1, wallet2, wallet3].map((wallet) => ({
      value: wallet.address.toB256(),
    }));

    const token = await setup();

    const functionCallOne = token.functions.mint_to_addresses(addresses, 10);
    await functionCallOne.txParams({ gasLimit: 10_000 }).dryRun();
    const { transactionResult } = await functionCallOne
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    const { mintedAssets } = transactionResult;
    const assetId = mintedAssets?.[0].assetId;

    let balances = await wallet1.getBalances();
    let tokenBalance = balances.find((b) => b.assetId === assetId);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(10));

    balances = await wallet2.getBalances();
    tokenBalance = balances.find((b) => b.assetId === assetId);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(10));

    balances = await wallet3.getBalances();
    tokenBalance = balances.find((b) => b.assetId === assetId);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(10));

    const functionCallTwo = token.functions.mint_to_addresses(addresses, 10);
    await functionCallTwo.txParams({ gasLimit: 10_000 }).simulate();
    await functionCallTwo.txParams({ gasPrice, gasLimit: 10_000 }).call();

    balances = await wallet1.getBalances();
    tokenBalance = balances.find((b) => b.assetId === assetId);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(20));

    balances = await wallet2.getBalances();
    tokenBalance = balances.find((b) => b.assetId === assetId);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(20));

    balances = await wallet3.getBalances();
    tokenBalance = balances.find((b) => b.assetId === assetId);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(20));

    await token.functions
      .mint_to_addresses(addresses, 10)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();
    balances = await wallet1.getBalances();
    tokenBalance = balances.find((b) => b.assetId === assetId);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(30));

    balances = await wallet2.getBalances();
    tokenBalance = balances.find((b) => b.assetId === assetId);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(30));

    balances = await wallet3.getBalances();
    tokenBalance = balances.find((b) => b.assetId === assetId);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(30));
  });

  it('Contract getBalance', async () => {
    const userWallet = Wallet.generate({ provider });
    const token = await setup();
    const addressId = {
      value: userWallet.address.toB256(),
    };

    // mint 100 coins
    const { transactionResult } = await token.functions
      .mint_coins(100)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();
    const { mintedAssets } = transactionResult;
    const assetId: AssetId = { value: mintedAssets?.[0].assetId || '' };

    const getBalance = async () => token.getBalance(assetId.value);

    // at the start, the contract should have 100 coins
    expect((await getBalance()).toHex()).toEqual(bn(100).toHex());

    // transfer 50 coins to user wallet
    await token.functions
      .transfer_coins_to_output(addressId, assetId, 50)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    // the contract should now have only 50 coins
    expect((await getBalance()).toHex()).toEqual(bn(50).toHex());
  });

  it('throws when passing entire Address object as address parameter', async () => {
    const userWallet = Wallet.generate({ provider });
    const token = await setup();
    const addressParameter = {
      value: userWallet.address,
    };
    const assetId: AssetId = { value: BaseAssetId };

    await expectToThrowFuelError(
      () => token.functions.transfer_coins_to_output(addressParameter, assetId, 50).call(),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid b256.')
    );
  });
});
