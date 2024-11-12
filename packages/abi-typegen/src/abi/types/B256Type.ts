import { StrType } from './StrType';

export class B256Type extends StrType {
  public static override swayType = 'b256';

  public override name = 'b256';

  static override MATCH_REGEX = /^b256$/m;

  static override isSuitableFor(params: { type: string }) {
    return B256Type.MATCH_REGEX.test(params.type);
  }
}
