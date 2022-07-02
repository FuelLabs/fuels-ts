import { NativeAssetId } from '@fuel-ts/constants';
import { Provider } from '@fuel-ts/providers';
import { Wallet, TestUtils } from '@fuel-ts/wallet';
import { readFileSync } from 'fs';
import { join } from 'path';

import ContractFactory from '../../contract-factory';

import abi from './token_contract/out/debug/token_contract-abi.json';

const provider = new Provider('http://127.0.0.1:4000/graphql');

const setup = async () => {
  // Create wallet
  const wallet = await TestUtils.generateTestWallet(provider, [[1_000, NativeAssetId]]);

  // Deploy contract
  const bytecode = readFileSync(join(__dirname, './token_contract/out/debug/token_contract.bin'));
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
      const result = await token.submit.get_balance(tokenId, tokenId);
      return result;
    };

    // Mint some coins
    await token.submit.mint_coins(100, 1);
    // Check balance is correct
    expect(await getBalance()).toEqual(100n);
    // Transfer some coins
    await token.submit.transfer_coins_to_output(50, tokenId, addressId, {
      variableOutputs: 1,
    });
    // Check new wallet received the coins from the token contract
    const balances = await userWallet.getBalances();
    const tokenBalance = balances.find((b) => b.assetId === token.id);
    expect(tokenBalance?.amount).toEqual(50n);
  });
});
