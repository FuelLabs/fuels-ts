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
    Have in mind, all types also need the following static members:

      static MATCH_REGEX: RegExp
      static IGNORE_REGEX?: RegExp
      static isSuitableFor (params: { rawAbiType: IRawAbiTypeRoot }): Boolean

  */
}
