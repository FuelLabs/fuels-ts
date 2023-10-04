import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import type { CoinTransactionRequestInput } from 'fuels';
import {
  Provider,
  FUEL_NETWORK_URL,
  BaseAssetId,
  Predicate,
  ScriptTransactionRequest,
  bn,
} from 'fuels';
import { join } from 'path';

import abiJSON from '../fixtures/forc-projects/predicate-multi-args/out/debug/predicate-multi-args-abi.json';

const predicateBytecode = readFileSync(
  join(
    __dirname,
    '../fixtures/forc-projects/predicate-multi-args/out/debug/predicate-multi-args.bin'
  )
);

describe('predicate resources with custom transaction', () => {
  it(`predicate data can be set before adding its resources to custom transaction,
    and that data will be set in the resources after they're added to the transaction
`, async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const wallet = await generateTestWallet(provider, [[5_000, BaseAssetId]]);

    const amountToTransfer = 1000;

    const predicate = new Predicate(predicateBytecode, provider, abiJSON);

    await wallet.transfer(predicate.address, amountToTransfer, BaseAssetId);

    const request = new ScriptTransactionRequest({
      gasLimit: 1000,
      gasPrice: 1,
    });

    predicate.setData(bn(1), bn(1));

    // fetch predicate resources to spend
    const predicateResources = await predicate.getResourcesToSpend([
      [amountToTransfer, BaseAssetId],
    ]);

    predicate.setData(bn(2), bn(2));

    const postResourceFetchPredicateData = new Uint8Array(predicate.predicateData);
    request.addResources(predicateResources);

    request.inputs.forEach((input) => {
      expect((input as CoinTransactionRequestInput).predicateData).toEqual(
        postResourceFetchPredicateData
      );
    });
  });

  it(`setting predicate data after adding its resources to custom transaction does not affect those resources' predicate and predicateData,
    because inputs shouldn't be mutated after being added
`, async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const adminWallet = await generateTestWallet(provider, [[5_000, BaseAssetId]]);

    const amountToTransfer = 1000;

    const predicate = new Predicate(predicateBytecode, provider, abiJSON);

    await adminWallet.transfer(predicate.address, amountToTransfer, BaseAssetId);

    const request = new ScriptTransactionRequest({
      gasLimit: 1000,
      gasPrice: 1,
    });

    // fetch predicate resources to spend
    const predicateResources = await predicate.getResourcesToSpend([
      [amountToTransfer, BaseAssetId],
    ]);

    predicate.setData(bn(1), bn(1));

    const initialPredicateData = new Uint8Array(predicate.predicateData);

    request.addResources(predicateResources);

    predicate.setData(bn(1), bn(2));

    request.inputs.forEach((input) => {
      expect((input as CoinTransactionRequestInput).predicateData).toEqual(initialPredicateData);
    });
  });
});
