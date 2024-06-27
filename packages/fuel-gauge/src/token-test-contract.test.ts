import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AssetId, BN } from 'fuels';
import { toHex, Provider, Wallet, ContractFactory, bn, FUEL_NETWORK_URL } from 'fuels';
import { expectToThrowFuelError, generateTestWallet } from 'fuels/test-utils';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

const { binHexlified: bytecode, abiContents: abi } = getFuelGaugeForcProject(
  FuelGaugeProjectsEnum.TOKEN_CONTRACT
);

let provider: Provider;
let baseAssetId: string;

const setup = async () => {
  // Create wallet
  const wallet = await generateTestWallet(provider, [[5_000_000, baseAssetId]]);

  // Deploy contract
  const factory = new ContractFactory(bytecode, abi, wallet);
  const contract = await factory.deployContract();

  return contract;
};

beforeAll(async () => {
  provider = await Provider.create(FUEL_NETWORK_URL);
  baseAssetId = provider.getBaseAssetId();
});

/**
 * @group node
 */
describe('TokenTestContract', () => {
  it('Can mint and transfer coins', async () => {
    // New wallet to transfer coins and check balance
    const userWallet = Wallet.generate({ provider });
    const token = await setup();
    const tokenContractId = { bits: token.id.toB256() };
    const addressId = { bits: userWallet.address.toB256() };

    // Mint some coins
    const { transactionResult } = await token.functions.mint_coins(100).call();

    const { mintedAssets } = transactionResult;

    const assetId: AssetId = { bits: mintedAssets?.[0].assetId };

    const getBalance = async () => {
      const { value } = await token.functions.get_balance(tokenContractId, assetId).simulate<BN>();
      return value;
    };
    // Check balance is correct
    await token.functions.mint_coins(100).call();

    expect((await getBalance()).toHex()).toEqual(toHex(200));

    // Transfer some coins
    await token.functions.transfer_to_address(addressId, assetId, 50).call();

    // Check new wallet received the coins from the token contract
    const balances = await userWallet.getBalances();
    const tokenBalance = balances.find((b) => b.assetId === assetId.bits);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(50));
  });

  it('Automatically add variableOuputs', async () => {
    const [wallet1, wallet2, wallet3] = Array.from({ length: 3 }, () =>
      Wallet.generate({ provider })
    );

    const addresses = [wallet1, wallet2, wallet3].map((wallet) => ({
      bits: wallet.address.toB256(),
    }));

    const token = await setup();

    const functionCallOne = token.functions.mint_to_addresses(addresses, 10);
    await functionCallOne.dryRun();
    const { transactionResult } = await functionCallOne.call();

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
    await functionCallTwo.simulate();
    await functionCallTwo.call();

    balances = await wallet1.getBalances();
    tokenBalance = balances.find((b) => b.assetId === assetId);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(20));

    balances = await wallet2.getBalances();
    tokenBalance = balances.find((b) => b.assetId === assetId);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(20));

    balances = await wallet3.getBalances();
    tokenBalance = balances.find((b) => b.assetId === assetId);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(20));

    await token.functions.mint_to_addresses(addresses, 10).call();
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
      bits: userWallet.address.toB256(),
    };

    // mint 100 coins
    const { transactionResult } = await token.functions.mint_coins(100).call();
    const { mintedAssets } = transactionResult;
    const assetId: AssetId = { bits: mintedAssets?.[0].assetId || '' };

    const getBalance = async () => token.getBalance(assetId.bits);

    // at the start, the contract should have 100 coins
    expect((await getBalance()).toHex()).toEqual(bn(100).toHex());

    // transfer 50 coins to user wallet
    await token.functions.transfer_to_address(addressId, assetId, 50).call();

    // the contract should now have only 50 coins
    expect((await getBalance()).toHex()).toEqual(bn(50).toHex());
  });

  it('throws when passing entire Address object as address parameter', async () => {
    const userWallet = Wallet.generate({ provider });
    const token = await setup();
    const addressParameter = {
      bits: userWallet.address,
    };
    const assetId: AssetId = { bits: baseAssetId };

    await expectToThrowFuelError(
      () => token.functions.transfer_to_address(addressParameter, assetId, 50).call(),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid b256.')
    );
  });
});
