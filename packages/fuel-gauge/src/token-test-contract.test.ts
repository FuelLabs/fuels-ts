import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import type { BN } from 'fuels';
import { toHex, Provider, Wallet, ContractFactory, bn, NativeAssetId } from 'fuels';
import { join } from 'path';

import abi from '../test-projects/token_contract/out/debug/token_contract-abi.json';

const provider = new Provider('http://127.0.0.1:4000/graphql');

const setup = async () => {
  // Create wallet
  const wallet = await generateTestWallet(provider, [[1_000, NativeAssetId]]);

  // Deploy contract
  const bytecode = readFileSync(
    join(__dirname, '../test-projects/token_contract/out/debug/token_contract.bin')
  );
  const factory = new ContractFactory(bytecode, abi, wallet);
  const contract = await factory.deployContract();

  return contract;
};

describe('TokenTestContract', () => {
  it('Can mint and transfer coins', async () => {
    // New wallet to transfer coins and check balance
    const userWallet = Wallet.generate({ provider });
    const token = await setup();
    const tokenId = {
      value: token.id,
    };
    const addressId = {
      value: userWallet.address,
    };
    const getBalance = async () => {
      const { value } = await token.functions.get_balance(tokenId, tokenId).get<BN>();
      return value;
    };

    // Mint some coins
    await token.functions.mint_coins(100, 1).call();
    // Check balance is correct
    expect((await getBalance()).toHex()).toEqual(toHex(100));
    // Transfer some coins
    // #region typedoc:variable-outputs
    await token.functions
      .transfer_coins_to_output(50, tokenId, addressId)
      .txParams({
        variableOutputs: 1,
      })
      .call();
    // #endregion
    // Check new wallet received the coins from the token contract
    const balances = await userWallet.getBalances();
    const tokenBalance = balances.find((b) => b.assetId === token.id.toB256());
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(50));
  });

  it('Automatically add variableOuputs', async () => {
    const [wallet1, wallet2, wallet3] = Array.from({ length: 3 }, () =>
      Wallet.generate({ provider })
    );

    const addresses = [wallet1, wallet2, wallet3].map((wallet) => ({ value: wallet.address }));

    const token = await setup();

    const functionCallOne = token.functions.mint_to_addresses(10, addresses);
    await functionCallOne.dryRun();
    await functionCallOne.call();

    let balances = await wallet1.getBalances();
    let tokenBalance = balances.find((b) => b.assetId === token.id.toB256());
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(10));

    balances = await wallet2.getBalances();
    tokenBalance = balances.find((b) => b.assetId === token.id.toB256());
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(10));

    balances = await wallet3.getBalances();
    tokenBalance = balances.find((b) => b.assetId === token.id.toB256());
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(10));

    const functionCallTwo = token.functions.mint_to_addresses(10, addresses);
    await functionCallTwo.simulate();
    await functionCallTwo.call();

    balances = await wallet1.getBalances();
    tokenBalance = balances.find((b) => b.assetId === token.id.toB256());
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(20));

    balances = await wallet2.getBalances();
    tokenBalance = balances.find((b) => b.assetId === token.id.toB256());
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(20));

    balances = await wallet3.getBalances();
    tokenBalance = balances.find((b) => b.assetId === token.id.toB256());
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(20));

    await token.functions.mint_to_addresses(10, addresses).call();
    balances = await wallet1.getBalances();
    tokenBalance = balances.find((b) => b.assetId === token.id.toB256());
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(30));

    balances = await wallet2.getBalances();
    tokenBalance = balances.find((b) => b.assetId === token.id.toB256());
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(30));

    balances = await wallet3.getBalances();
    tokenBalance = balances.find((b) => b.assetId === token.id.toB256());
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(30));
  });

  it('Contract getBalance', async () => {
    const userWallet = Wallet.generate({ provider });
    const token = await setup();
    const tokenId = {
      value: token.id,
    };
    const addressId = {
      value: userWallet.address,
    };

    const getBalance = async () => token.getBalance(token.id.toB256());

    // mint 100 coins
    await token.functions.mint_coins(100, 1).call();

    // at the start, the contract should have 100 coins
    expect((await getBalance()).toHex()).toEqual(bn(100).toHex());

    // transfer 50 coins to user wallet
    await token.functions
      .transfer_coins_to_output(50, tokenId, addressId)
      .txParams({
        variableOutputs: 1,
      })
      .call();

    // the contract should now have only 50 coins
    expect((await getBalance()).toHex()).toEqual(bn(50).toHex());
  });
});
