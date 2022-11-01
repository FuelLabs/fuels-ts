import type { IAbiTypeRoot } from './IAbiType';

export interface ITypeAttributes {
  inputLabel: string;
  outputLabel: string;
  structName?: string;
  /*
    If `structName` is set, intput/output labels will mirror it.
  */
}

export interface IType {
  name: string;
  attributes: ITypeAttributes;
  rawAbiType: IAbiTypeRoot;
  parseComponentsAttributes(params: { types: IType[] }): ITypeAttributes;
  /*
    Sub-classes must also implement these STATIC members:

    static MATCH_REGEX: RegExp
    static IGNORE_REGEX?: RegExp
    static isSuitableFor (params: { rawAbiType: IAbiTypeRoot }): Boolean
  */
}
