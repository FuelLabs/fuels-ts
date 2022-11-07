import type { IRawAbiTypeRoot } from './IRawAbiType';

export interface ITypeAttributes {
  inputLabel: string;
  outputLabel: string;
  structName?: string;
  enumName?: string;
  /*
    If `structName` or `enumName` is set, intput/output labels will mirror it.
  */
}

export interface IType {
  name: string;
  attributes: ITypeAttributes;
  rawAbiType: IRawAbiTypeRoot;
  parseComponentsAttributes(params: { types: IType[] }): ITypeAttributes;

  // only for `StructType`
  getStructName?(): string;
  getStructContents?(params: { types: IType[] }): string;

  // only for `EnumType`
  getEnumName?(): string;
  getEnumContents?(params: { types: IType[] }): string;

  /*
    Have in mind, all types also need the following static members:

      static MATCH_REGEX: RegExp
      static IGNORE_REGEX?: RegExp
      static isSuitableFor (params: { type: text }): Boolean

  */
}
