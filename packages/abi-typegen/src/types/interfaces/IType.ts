import type { SupportedTypeClass } from '../../utils/supportedTypes';

export interface ITypeAttributes {
  inputLabel: string;
  outputLabel: string;
  structName?: string;
  /*
    If `structName` is set, input/output labels will mirror it.
  */
}

export interface IType {
  name: string;
  attributes: ITypeAttributes;
  requiredFuelsMembersImports: string[];
  typeDeclarations: { input: string; output: string };
  structContents: { input: string; output: string };

  parseComponentsAttributes(types: SupportedTypeClass[]): void;

  parseStructContents?(types: SupportedTypeClass[]): void;
  parseTypeDeclarations(types: SupportedTypeClass[]): void;

  /*
    Have in mind, all types also need the following static members:

      static MATCH_REGEX: RegExp
      static IGNORE_REGEX?: RegExp
      static isSuitableFor (params: { type: text }): Boolean

  */
}
