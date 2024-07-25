import { ArrayType } from './ArrayType';

export class BytesType extends ArrayType {
  public static swayType = 'struct Bytes';

  public name = 'bytes';

  static MATCH_REGEX: RegExp = /^struct (std::bytes::)?Bytes/m;

  static isSuitableFor(params: { type: string }) {
    return BytesType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes() {
    const capitalizedName = 'Bytes';

    this.attributes = {
      inputLabel: capitalizedName,
      outputLabel: capitalizedName,
    };

    this.requiredFuelsMembersImports = [capitalizedName];

    return this.attributes;
  }
}
