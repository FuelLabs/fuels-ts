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
  requireImportFromFuels?: boolean;

  parseComponentsAttributes(params: { types: IType[] }): ITypeAttributes;

  // Methods only present in `EnumType` and `StructType` classes
  getStructName?(): string;
  getStructContents?(params: { types: IType[] }): string;

  /*
    Have in mind, all types also need the following static members:

      static MATCH_REGEX: RegExp
      static IGNORE_REGEX?: RegExp
      static isSuitableFor (params: { type: text }): Boolean

  */
}
