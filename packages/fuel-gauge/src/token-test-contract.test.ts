import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import type { BN } from 'fuels';
import { toHex, Provider, Wallet, ContractFactory, bn, BaseAssetId, FUEL_NETWORK_URL } from 'fuels';
import { join } from 'path';

import abi from '../fixtures/forc-projects/token_contract/out/debug/token_contract-abi.json';

let provider: Provider;

const setup = async () => {
  // Create wallet
  const wallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);

  // Deploy contract
  const bytecode = readFileSync(
    join(__dirname, '../fixtures/forc-projects/token_contract/out/debug/token_contract.bin')
  );
  const factory = new ContractFactory(bytecode, abi, wallet);
  const contract = await factory.deployContract();

  return contract;
};

beforeAll(async () => {
  provider = await Provider.connect(FUEL_NETWORK_URL);
});

describe('TokenTestContract', () => {
  it('Can mint and transfer coins', async () => {
    // New wallet to transfer coins and check balance
    const userWallet = Wallet.generate({ provider });
    const token = await setup();
    const tokenContractId = { value: token.id.toB256() };
    const addressId = { value: userWallet.address };

    // Mint some coins
    const { transactionResult } = await token.functions.mint_coins(100).call();

    const { mintedAssets } = transactionResult;

    const assetId = mintedAssets?.[0].assetId;

    const getBalance = async () => {
      const { value } = await token.functions.get_balance(tokenContractId, assetId).simulate<BN>();
      return value;
    };
    // Check balance is correct

    await token.functions.mint_coins(100).call();

    expect((await getBalance()).toHex()).toEqual(toHex(200));

    // Transfer some coins
    await token.functions.transfer_coins_to_output(addressId, assetId, 50).call();

    // Check new wallet received the coins from the token contract
    const balances = await userWallet.getBalances();
    const tokenBalance = balances.find((b) => b.assetId === assetId);
    expect(tokenBalance?.amount.toHex()).toEqual(toHex(50));
  });

  it('Automatically add variableOuputs', async () => {
    const [wallet1, wallet2, wallet3] = Array.from({ length: 3 }, () =>
      Wallet.generate({ provider })
    );

    const addresses = [wallet1, wallet2, wallet3].map((wallet) => ({ value: wallet.address }));

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
      value: userWallet.address,
    };

    // mint 100 coins
    const { transactionResult } = await token.functions.mint_coins(100).call();
    const { mintedAssets } = transactionResult;
    const assetId = mintedAssets?.[0].assetId || '';

    const getBalance = async () => token.getBalance(assetId);

    // at the start, the contract should have 100 coins
    expect((await getBalance()).toHex()).toEqual(bn(100).toHex());

    // transfer 50 coins to user wallet
    await token.functions.transfer_coins_to_output(addressId, assetId, 50).call();

    // the contract should now have only 50 coins
    expect((await getBalance()).toHex()).toEqual(bn(50).toHex());
  });
});
