import { typerMatcher } from './typer-matcher';
import type { TyperParams, TyperReturn } from './types';

export function generateTsType(params: TyperParams): TyperReturn {
  return typerMatcher(params.abiType)(params, generateTsType);
}
