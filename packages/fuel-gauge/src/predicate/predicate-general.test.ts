import type { BN, FakeResources } from 'fuels';
import {
  Address,
  FUEL_NETWORK_URL,
  Predicate,
  Provider,
  ScriptTransactionRequest,
  bn,
} from 'fuels';
import { ASSET_A, ASSET_B } from 'fuels/test-utils';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../../test/fixtures';

/**
 * @group node
 */
describe('Predicate', () => {
  it('can generate and use fake predicate coins', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const baseAssetId = provider.getBaseAssetId();
    const { binHexlified, abiContents } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.PREDICATE_SUM
    );

    const amount1 = bn(500_000);
    const amount2 = bn(200_000);
    const amount3 = bn(300_000);
    const amountToTransferBaseAsset = bn(1000);

    const fakeCoinsConfig: FakeResources[] = [
      { amount: amount1, assetId: baseAssetId },
      { amount: amount2, assetId: ASSET_A },
      { amount: amount3, assetId: ASSET_B },
    ];

    const value2 = bn(200);
    const value1 = bn(100);

    const predicate = new Predicate<[BN, BN]>({
      bytecode: binHexlified,
      abi: abiContents,
      provider,
      inputData: [value1, value2],
    });

    const fakeCoins = predicate.generateFakeResources(fakeCoinsConfig);

    let request = new ScriptTransactionRequest({
      gasLimit: bn(270_000),
      maxFee: bn(250_000),
    });

    fakeCoins.forEach((coin) => {
      expect(coin.predicate).toBeDefined();
      expect(coin.predicateData).toBeDefined();
    });

    request.addResources(fakeCoins);
    request.addCoinOutput(Address.fromRandom(), amountToTransferBaseAsset, baseAssetId);
    request.addCoinOutput(Address.fromRandom(), amount2, ASSET_A);
    request.addCoinOutput(Address.fromRandom(), amount3, ASSET_B);

    request = await provider.estimatePredicates(request);

    const { dryRunStatus } = await provider.dryRun(request, {
      utxoValidation: false,
      estimateTxDependencies: false,
    });

    expect(dryRunStatus?.type).toBe('DryRunSuccessStatus');
  });
});
