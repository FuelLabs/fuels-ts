import { readFileSync } from 'fs';
import { NativeAssetId, toHex, Provider, Wallet, TestUtils, ContractFactory } from 'fuels';
import type { BN } from 'fuels';
import { join } from 'path';

import abi from '../test-projects/token_contract/out/debug/token_contract-abi.json';

const provider = new Provider('http://127.0.0.1:4000/graphql');

const setup = async () => {
  // Create wallet
  const wallet = await TestUtils.generateTestWallet(provider, [[1_000, NativeAssetId]]);

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
    await token.functions
      .transfer_coins_to_output(50, tokenId, addressId)
      .txParams({
        variableOutputs: 1,
      })
      .call();
    // Check new wallet received the coins from the token contract
    const balances = await userWallet.getBalances();
    const tokenBalance = balances.find((b) => b.assetId === token.id.toB256());
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(50));
  });
});
