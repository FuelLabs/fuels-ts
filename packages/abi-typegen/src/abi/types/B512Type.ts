import { B256Type } from './B256Type';

export class B512Type extends B256Type {
  public static override swayType = 'struct B512';

  public override name = 'b512';

  static override MATCH_REGEX = /^struct (std::b512::)?B512$/m;

  static override isSuitableFor(params: { type: string }) {
    return B512Type.MATCH_REGEX.test(params.type);
  }
}
