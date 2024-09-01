import type { BN, FakeResources } from 'fuels';
import { Address, Predicate, ScriptTransactionRequest, bn } from 'fuels';
import { ASSET_A, ASSET_B, launchTestNode } from 'fuels/test-utils';

import { PredicateSum } from '../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Predicate', () => {
  it('can generate and use fake predicate coins', async () => {
    using launched = await launchTestNode();

    const { provider } = launched;

    const amount1 = bn(500_000);
    const amount2 = bn(200_000);
    const amount3 = bn(300_000);
    const amountToTransferBaseAsset = bn(1000);

    const fakeCoinsConfig: FakeResources[] = [
      { amount: amount1, assetId: provider.getBaseAssetId() },
      { amount: amount2, assetId: ASSET_A },
      { amount: amount3, assetId: ASSET_B },
    ];

    const value2 = bn(200);
    const value1 = bn(100);

    const predicate = new Predicate<[BN, BN]>({
      abi: PredicateSum.abi,
      bytecode: PredicateSum.bytecode,
      provider,
      data: [value1, value2],
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
    request.addCoinOutput(
      Address.fromRandom(),
      amountToTransferBaseAsset,
      provider.getBaseAssetId()
    );
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
