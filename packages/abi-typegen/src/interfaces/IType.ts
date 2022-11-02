import type { IRawAbiTypeRoot } from './IRawAbiType';

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
  rawAbiType: IRawAbiTypeRoot;
  parseComponentsAttributes(params: { types: IType[] }): ITypeAttributes;

  // These 2 below are only for `StructType`
  getStructName?(): string;
  getStructContents?(params: { types: IType[] }): string;

  /*
    Sub-classes must also implement these STATIC members:

    static MATCH_REGEX: RegExp
    static IGNORE_REGEX?: RegExp
    static isSuitableFor (params: { rawAbiType: IRawAbiTypeRoot }): Boolean
  */
}
