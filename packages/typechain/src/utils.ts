import { AbiParameter, FunctionDeclaration } from './parser/abiParser';
import { TupleType } from './parser/parseSvmTypes';

export function getArgumentForSignature(argument: AbiParameter): string {
  if (argument.type.originalType !== 'tuple') return argument.type.originalType;
  return `(${(argument.type as TupleType).components
    .map((i) => getArgumentForSignature(i))
    .join(',')})`;
}

export function getSignatureForFn(fn: FunctionDeclaration): string {
  return `${fn.name}(${fn.inputs.map((i) => getArgumentForSignature(i)).join(',')})`;
}
