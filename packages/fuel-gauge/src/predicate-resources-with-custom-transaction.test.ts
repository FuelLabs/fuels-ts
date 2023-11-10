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
  it(`A transaction input's predicateData is always the last one set on the predicate before the resource was added to the custom transaction`, async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const wallet = await generateTestWallet(provider, [[5_000_000, BaseAssetId]]);

    const amountToTransfer = 1000;

    const predicate = new Predicate(predicateBytecode, provider, abiJSON);

    await wallet.transfer(predicate.address, amountToTransfer, BaseAssetId, {
      gasPrice: provider.getGasConfig().minGasPrice,
    });

    const request = new ScriptTransactionRequest({
      gasLimit: 1000,
      gasPrice: 1,
    });

    predicate.setData(bn(1), bn(1));

    const predicateDataBeforeGettingResoures = predicate.predicateData;

    // fetch predicate resources to spend
    const predicateResources = await predicate.getResourcesToSpend([
      [amountToTransfer, BaseAssetId],
    ]);

    predicate.setData(bn(2), bn(2));

    // ensure that predicate data changed
    expect(predicateDataBeforeGettingResoures).not.toEqual(predicate.predicateData);

    request.addResources(predicateResources);

    request.inputs.forEach((input) => {
      expect((input as CoinTransactionRequestInput).predicateData).toEqual(predicate.predicateData);
    });
  });

  it(`Settting a predicate's data after adding its resource to a custom transaction does not affect the input's predicateData,
    because a transaction's input shouldn't be mutated after it's added
`, async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const adminWallet = await generateTestWallet(provider, [[5_000_000, BaseAssetId]]);

    const amountToTransfer = 1000;

    const predicate = new Predicate(predicateBytecode, provider, abiJSON);

    await adminWallet.transfer(predicate.address, amountToTransfer, BaseAssetId, {
      gasPrice: provider.getGasConfig().minGasPrice,
    });

    const request = new ScriptTransactionRequest({
      gasLimit: 1000,
      gasPrice: 1,
    });

    // fetch predicate resources to spend
    const predicateResources = await predicate.getResourcesToSpend([
      [amountToTransfer, BaseAssetId],
    ]);

    predicate.setData(bn(1), bn(1));

    const predicateDataBeforeAddingResources = predicate.predicateData;

    request.addResources(predicateResources);

    predicate.setData(bn(1), bn(2));

    expect(predicateDataBeforeAddingResources).not.toEqual(predicate.predicateData);

    request.inputs.forEach((input) => {
      expect((input as CoinTransactionRequestInput).predicateData).toEqual(
        predicateDataBeforeAddingResources
      );
    });
  });
});
