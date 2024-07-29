import type { IType } from '../../types/interfaces/IType';

import { B256Type } from './B256Type';

export class AssetIdType extends B256Type {
  public static swayType = 'struct AssetId';
  public structContents: IType['structContents'] = {
    input: 'bits: string',
    output: 'bits: string',
  };

  public name = 'AssetId';

  static MATCH_REGEX = /^struct AssetId$/m;

  static isSuitableFor(params: { type: string }) {
    return AssetIdType.MATCH_REGEX.test(params.type);
  }
}
