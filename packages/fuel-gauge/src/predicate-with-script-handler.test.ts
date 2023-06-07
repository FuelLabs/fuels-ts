import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import type { CoinQuantityLike, WalletUnlocked } from 'fuels';
import { Provider, Predicate, NativeAssetId, ScriptTransactionRequest } from 'fuels';

import testPredicateTrue from '../test-projects/predicate-true';

const provider = new Provider('http://127.0.0.1:4000/graphql');

const getWallet = async () => {
  const wallet = await generateTestWallet(provider, [[1_000_000, NativeAssetId]]);
  return wallet;
};

describe('predicate with script handler', () => {
  const predicate = new Predicate(testPredicateTrue); // Predicate that evaluates to true
  let wallet: WalletUnlocked;
  const asset0 = NativeAssetId;
  const quantity0 = 100;

  it('can send a predicate transaction built with a script', async () => {
    wallet = await getWallet();

    const initialPredicateBalance = (await predicate.getBalance(asset0)).toNumber();

    // Fund the predicate
    const fundPredicateTx = await wallet.transfer(predicate.address, quantity0, asset0);
    await fundPredicateTx.waitForResult();

    const secondPredicateBalance = (await predicate.getBalance(asset0)).toNumber();

    // Assert that predicate has been funded
    expect(secondPredicateBalance).toBeGreaterThan(initialPredicateBalance);

    const txParams = {
      gasLimit: 10000,
      gasPrice: 0,
    };

    // Build out the script transaction
    const script = new ScriptTransactionRequest(txParams);

    const quantities: CoinQuantityLike[] = [[quantity0, asset0]];

    const inputs = await predicate.getResourcesToSpend(quantities);

    // Add inputs and outputs
    script.addResources(inputs);
    script.addCoinOutput(wallet.address, quantity0, asset0);

    // Send transaction utilizing predicate and script
    await predicate.sendTransaction(script);

    const lastPredicateBalance = (await predicate.getBalance(asset0)).toNumber();

    // Assert that predicate has been spent and is now the same balance before funding
    expect(lastPredicateBalance).toEqual(initialPredicateBalance);
  });
});
