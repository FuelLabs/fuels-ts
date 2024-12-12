import { GENERIC_REGEX } from '../../../../matchers/sway-type-matchers';

import type { TyperReturn, Typer } from './types';

const numberTyperReturn: TyperReturn = {
  input: 'BigNumberish',
  output: 'number',
  fuelsTypeImports: ['BigNumberish'],
};

export const u8Typer: Typer = () => numberTyperReturn;
export const u16Typer = u8Typer;
export const u32Typer = u8Typer;

const u64TyperReturn: TyperReturn = {
  input: 'BigNumberish',
  output: 'BN',
  fuelsTypeImports: ['BigNumberish', 'BN'],
};
export const u64Typer: Typer = () => u64TyperReturn;
export const u256Typer: Typer = u64Typer;

const boolTyperReturn = {
  input: 'boolean',
  output: 'boolean',
};
export const boolTyper: Typer = () => boolTyperReturn;

const stringTyperReturn: TyperReturn = {
  input: 'string',
  output: 'string',
};
export const stringTyper: Typer = () => stringTyperReturn;
export const b256Typer: Typer = stringTyper;
export const b512Typer: Typer = stringTyper;

const evmAddressTyperReturn: TyperReturn = {
  input: 'EvmAddress',
  output: 'EvmAddress',
  fuelsTypeImports: ['EvmAddress'],
};
export const evmAddressTyper: Typer = () => evmAddressTyperReturn;

const bytesTyperReturn: TyperReturn = {
  input: 'Bytes',
  output: 'Bytes',
  fuelsTypeImports: ['Bytes'],
};
export const bytesTyper: Typer = () => bytesTyperReturn;

const strTyperReturn: TyperReturn = {
  input: 'StrSlice',
  output: 'StrSlice',
  fuelsTypeImports: ['StrSlice'],
};
export const strTyper: Typer = () => strTyperReturn;

const rawSliceTyperReturn: TyperReturn = {
  input: 'RawSlice',
  output: 'RawSlice',
  fuelsTypeImports: ['RawSlice'],
};
export const rawSliceTyper = () => rawSliceTyperReturn;

const stdStringTyperReturn: TyperReturn = {
  input: 'StdString',
  output: 'StdString',
  fuelsTypeImports: ['StdString'],
};
export const stdStringTyper: Typer = () => stdStringTyperReturn;

const voidTyperReturn: TyperReturn = { input: 'undefined', output: 'void' };
export const voidTyper: Typer = () => voidTyperReturn;

export const genericTyper: Typer = ({ abiType }) => {
  const typeName = GENERIC_REGEX.exec(abiType.swayType)?.[1] as string;
  return {
    input: typeName,
    output: typeName,
  };
};
