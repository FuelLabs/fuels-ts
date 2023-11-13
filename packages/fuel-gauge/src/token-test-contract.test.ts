import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { TestNodeLauncher } from '@fuel-ts/test-utils';
import type { BN } from 'fuels';
import { toHex, Wallet, bn, BaseAssetId } from 'fuels';

import { getProgramDir } from './utils';

const contractDir = getProgramDir('token_contract');

/**
 * @group node
 */
describe('TokenTestContract', () => {
  beforeAll(async (ctx) => {});

  it('Can mint and transfer coins', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [token],
      provider,
    } = launched;
    const { minGasPrice: gasPrice } = provider.getGasConfig();

    // New wallet to transfer coins and check balance
    const userWallet = Wallet.generate({ provider });
    const tokenContractId = { value: token.id.toB256() };
    const addressId = { value: userWallet.address.toB256() };

    // Mint some coins
    const { transactionResult } = await token.functions
      .mint_coins(100)
      .txParams({ gasPrice })
      .call();

    const { mintedAssets } = transactionResult;

    const assetId = mintedAssets?.[0].assetId;

    const getBalance = async () => {
      const { value } = await token.functions.get_balance(tokenContractId, assetId).simulate<BN>();
      return value;
    };
    // Check balance is correct

    await token.functions.mint_coins(100).txParams({ gasPrice }).call();

    expect((await getBalance()).toHex()).toEqual(toHex(200));

    // Transfer some coins
    await token.functions
      .transfer_coins_to_output(addressId, assetId, 50)
      .txParams({ gasPrice })
      .call();

    // Check new wallet received the coins from the token contract
    const balances = await userWallet.getBalances();
    const tokenBalance = balances.find((b) => b.assetId === assetId);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(50));
  });

  it('Automatically add variableOuputs', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [token],
      provider,
    } = launched;
    const { minGasPrice: gasPrice } = provider.getGasConfig();

    const [wallet1, wallet2, wallet3] = Array.from({ length: 3 }, () =>
      Wallet.generate({ provider })
    );

    const addresses = [wallet1, wallet2, wallet3].map((wallet) => ({
      value: wallet.address.toB256(),
    }));

    const functionCallOne = token.functions.mint_to_addresses(addresses, 10);
    await functionCallOne.dryRun();
    const { transactionResult } = await functionCallOne.txParams({ gasPrice }).call();

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
    await functionCallTwo.txParams({ gasPrice }).call();

    balances = await wallet1.getBalances();
    tokenBalance = balances.find((b) => b.assetId === assetId);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(20));

    balances = await wallet2.getBalances();
    tokenBalance = balances.find((b) => b.assetId === assetId);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(20));

    balances = await wallet3.getBalances();
    tokenBalance = balances.find((b) => b.assetId === assetId);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(20));

    await token.functions.mint_to_addresses(addresses, 10).txParams({ gasPrice }).call();
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
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [token],
      provider,
    } = launched;
    const { minGasPrice: gasPrice } = provider.getGasConfig();

    const userWallet = Wallet.generate({ provider });
    const addressId = {
      value: userWallet.address.toB256(),
    };

    // mint 100 coins
    const { transactionResult } = await token.functions
      .mint_coins(100)
      .txParams({ gasPrice })
      .call();
    const { mintedAssets } = transactionResult;
    const assetId = mintedAssets?.[0].assetId || '';

    const getBalance = () => token.getBalance(assetId);

    // at the start, the contract should have 100 coins
    expect((await getBalance()).toHex()).toEqual(bn(100).toHex());

    // transfer 50 coins to user wallet
    await token.functions
      .transfer_coins_to_output(addressId, assetId, 50)
      .txParams({ gasPrice })
      .call();

    // the contract should now have only 50 coins
    expect((await getBalance()).toHex()).toEqual(bn(50).toHex());
  });

  it('throws when passing entire Address object as address parameter', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [token],
      provider,
    } = launched;

    const userWallet = Wallet.generate({ provider });
    const addressParameter = {
      value: userWallet.address,
    };
    const assetId = BaseAssetId;

    await expectToThrowFuelError(
      () => token.functions.transfer_coins_to_output(addressParameter, assetId, 50).call(),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid b256.')
    );
  });
});
