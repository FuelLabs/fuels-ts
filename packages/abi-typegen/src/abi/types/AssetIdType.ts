import { B256Type } from './B256Type';

export class AssetIdType extends B256Type {
  public static override swayType = 'struct AssetId';

  public override name = 'AssetId';

  static override MATCH_REGEX = /^struct AssetId$/m;

  static override isSuitableFor(params: { type: string }) {
    return AssetIdType.MATCH_REGEX.test(params.type);
  }
}
