import { launchTestNode, TestAssetId } from 'fuels/test-utils';

// #region multiple-wallets
using launched = await launchTestNode({
  walletsConfig: {
    count: 3,
    assets: [TestAssetId.A, TestAssetId.B],
    coinsPerAsset: 5,
    amountPerCoin: 100_000,
  },
});

const {
  wallets: [wallet1, wallet2, wallet3],
} = launched;
// #endregion multiple-wallets

console.log('Wallet 1 should be defined', wallet1);
console.log('Wallet 2 should be defined', wallet2);
console.log('Wallet 3 should be defined', wallet3);
