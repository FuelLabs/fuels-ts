import type { AbiParameter, FunctionDeclaration } from './parser/abiParser';
import type { TupleType } from './parser/parseSvmTypes';

/**
 * Generate signature for abi tuple
 */
export function getArgumentForSignature(argument: AbiParameter): string {
  if (argument.type.originalType !== 'tuple') return argument.type.originalType;
  return `(${(argument.type as TupleType).components
    .map((i) => getArgumentForSignature(i))
    .join(',')})`;
}

/**
 * Generate signature for functions both primative and non-primative types
 */
export function getSignatureForFn(fn: FunctionDeclaration): string {
  return `${fn.name}(${fn.inputs.map((i) => getArgumentForSignature(i)).join(',')})`;
}
