import type { AbiParameter, EventDeclaration, FunctionDeclaration } from '../parser/abiParser';
import type { ArrayType, TupleType } from '../parser/parseEvmType';

export function getFullSignatureAsSymbolForEvent(event: EventDeclaration): string {
  return `${event.name}_${event.inputs
    .map((e) => {
      if (e.type.type === 'array') {
        return `${e.type.itemType.originalType}_array`;
      }
      return e.type.originalType;
    })
    .join('_')}`;
}

export function getFullSignatureForEvent(event: EventDeclaration): string {
  return `${event.name}(${event.inputs.map((e) => e.type.originalType).join(',')})`;
}

export function getIndexedSignatureForEvent(event: EventDeclaration): string {
  const indexedType = event.inputs.filter((e) => e.isIndexed);
  return `${event.name}(${indexedType.map((e) => e.type.originalType).join(',')})`;
}

export function getArgumentForSignature(argument: AbiParameter): string {
  if (argument.type.originalType === 'tuple') {
    return `(${(argument.type as TupleType).components
      .map((i) => getArgumentForSignature(i))
      .join(',')})`;
  }
  if (argument.type.originalType === 'tuple[]') {
    return `${getArgumentForSignature({
      name: '',
      type: (argument.type as ArrayType).itemType,
    })}[]`;
  }
  return argument.type.originalType;
}

export function getSignatureForFn(fn: FunctionDeclaration): string {
  return `${fn.name}(${fn.inputs.map((i) => getArgumentForSignature(i)).join(',')})`;
}
