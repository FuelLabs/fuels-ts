import { bn } from '@fuel-ts/math';
import { ReceiptType } from '@fuel-ts/transactions';

import type {
  TransactionResultBurnReceipt,
  TransactionResultMintReceipt,
  TransactionResultReceipt,
} from '../transaction-response';

import { extractBurnedAssetsFromReceipts, extractMintedAssetsFromReceipts } from './receipt';
import type { MintedAsset, BurnedAsset } from './types';

/**
 * @group node
 */
describe('extractMintedAssetsFromReceipts and extractBurnedAssetsFromReceipts', () => {
  it('should extracts minted and burned assets just fine', () => {
    // Sample input
    const receipts: Array<TransactionResultMintReceipt | TransactionResultBurnReceipt> = [
      {
        type: ReceiptType.Mint,
        subId: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        contractId: '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
        assetId: '0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210',
        val: bn(100),
        is: bn(22),
        pc: bn(33),
      },
      {
        type: ReceiptType.Burn,
        subId: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        contractId: '0x5555555555555555555555555555555555555555555555555555555555555555',
        assetId: '0x9876543210abcdef9876543210abcdef9876543210abcdef9876543210abcdef',
        val: bn(200),
        is: bn(44),
        pc: bn(11),
      },
    ];

    // Expected output
    const expectedMintedAssets: MintedAsset[] = [
      {
        subId: receipts[0].subId,
        contractId: receipts[0].contractId,
        assetId: receipts[0].assetId,
        amount: receipts[0].val,
      },
    ];

    const expectedBurnedAssets: BurnedAsset[] = [
      {
        subId: receipts[1].subId,
        contractId: receipts[1].contractId,
        assetId: receipts[1].assetId,
        amount: receipts[1].val,
      },
    ];

    // Call the function and verify the output
    const mintedAssets = extractMintedAssetsFromReceipts(receipts);
    const burnedAssets = extractBurnedAssetsFromReceipts(receipts);

    expect(mintedAssets).toEqual(expectedMintedAssets);
    expect(burnedAssets).toEqual(expectedBurnedAssets);
  });

  it('should returns empty arrays if there are no mint or burn receipts', () => {
    const receipts: Array<TransactionResultReceipt> = [];

    const mintedAssets = extractMintedAssetsFromReceipts(receipts);
    const burnedAssets = extractBurnedAssetsFromReceipts(receipts);

    expect(mintedAssets).toEqual([]);
    expect(burnedAssets).toEqual([]);
  });
});
