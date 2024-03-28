import { BaseAssetId } from '@fuel-ts/address/configs';
import { randomBytes } from '@fuel-ts/crypto';
import { hexlify } from '@fuel-ts/utils';

export class AssetId {
  public static BaseAssetId = new AssetId(BaseAssetId);

  public static A = new AssetId(
    '0x0101010101010101010101010101010101010101010101010101010101010101'
  );

  public static B = new AssetId(
    '0x0202020202020202020202020202020202020202020202020202020202020202'
  );

  private constructor(public value: string) {}

  public static random() {
    return new AssetId(hexlify(randomBytes(32)));
  }
}
