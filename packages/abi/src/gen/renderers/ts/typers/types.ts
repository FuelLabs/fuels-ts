import type { AbiConcreteType, AbiTypeComponent, AbiMetadataType } from '../../../../parser';

export interface TyperReturn {
  input: string;
  output: string;
  fuelsTypeImports?: string[];
  commonTypeImports?: string[];
  tsType?: 'enum' | 'type';
}

export type TyperAbiType = AbiConcreteType | AbiMetadataType | AbiTypeComponent['type'];

export type TyperParams = {
  abiType: TyperAbiType;
  asReference?: boolean;
};

export type GlobalTyper = (p: TyperParams) => TyperReturn;

export type Typer = (params: TyperParams, typer: GlobalTyper) => TyperReturn;
