import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AssetId, BN } from 'fuels';
import { toHex, Wallet, bn } from 'fuels';
import { expectToThrowFuelError, launchTestNode } from 'fuels/test-utils';

import { TokenContractAbi__factory } from '../test/typegen';
import TokenContractAbiHex from '../test/typegen/contracts/TokenContractAbi.hex';
/**
 * @group node
 * @group browser
 */

describe('TokenTestContract', () => {
  it('Can mint and transfer coins', async () => {
    // New wallet to transfer coins and check balance
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: TokenContractAbi__factory,
          bytecode: TokenContractAbiHex,
        },
      ],
    });

    const {
      provider,
      contracts: [token],
    } = launched;

    const userWallet = Wallet.generate({ provider });
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
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: TokenContractAbi__factory,
          bytecode: TokenContractAbiHex,
        },
      ],
      walletsConfig: {
        count: 3,
      },
    });

    const {
      wallets: [wallet1, wallet2, wallet3],
      contracts: [token],
    } = launched;

    const addresses = [wallet1, wallet2, wallet3].map((wallet) => ({
      bits: wallet.address.toB256(),
    }));

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
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: TokenContractAbi__factory,
          bytecode: TokenContractAbiHex,
        },
      ],
    });

    const {
      wallets: [userWallet],
      contracts: [token],
    } = launched;

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
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: TokenContractAbi__factory,
          bytecode: TokenContractAbiHex,
        },
      ],
    });

    const {
      provider,
      wallets: [userWallet],
      contracts: [token],
    } = launched;

    const addressParameter = {
      bits: userWallet.address,
    };
    const assetId: AssetId = { bits: provider.getBaseAssetId() };

    await expectToThrowFuelError(
      () => token.functions.transfer_to_address(addressParameter, assetId, 50).call(),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid b256.')
    );
  });
});
