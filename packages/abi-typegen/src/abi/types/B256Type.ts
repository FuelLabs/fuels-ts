import { StrType } from './StrType';

export class B256Type extends StrType {
  public static swayTypeExample = 'b256';

  public name = 'b256';

  static MATCH_REGEX = /^b256$/m;

  static isSuitableFor(params: { type: string }) {
    return B256Type.MATCH_REGEX.test(params.type);
  }
}
