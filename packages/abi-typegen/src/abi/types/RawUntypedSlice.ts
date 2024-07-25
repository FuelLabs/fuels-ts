import { ArrayType } from './ArrayType';

export class RawUntypedSlice extends ArrayType {
  public static swayType = 'raw untyped slice';

  private capitalizedName = 'RawSlice';

  public attributes = {
    inputLabel: this.capitalizedName,
    outputLabel: this.capitalizedName,
  };

  public requiredFuelsMembersImports = [this.capitalizedName];

  public name = 'rawUntypedSlice';

  public static MATCH_REGEX: RegExp = /^raw untyped slice$/m;

  static isSuitableFor(params: { type: string }) {
    return RawUntypedSlice.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes() {
    return this.attributes;
  }
}
