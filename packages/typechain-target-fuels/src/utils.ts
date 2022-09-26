import type { AbiParameter, FunctionDeclaration } from './parser/abiParser';
import type { DatumType, TupleType } from './parser/parseSvmTypes';
import { normalizeName } from './parser/parseSvmTypes';

export const OPTION_SOME = 'Some';

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

export const findSome = (svmType: DatumType) =>
  svmType.components.find(({ name }) => name === OPTION_SOME);

export const getNamePrefix = (datum: DatumType): string => {
  if (datum.structName !== 'Option') {
    return datum.structName;
  }

  const some = datum.components.find(({ name }) => name === OPTION_SOME);
  if (!some) {
    return datum.structName;
  }

  let subType: string = some.type.type;
  if (some.type.type === 'enum' || some.type.type === 'struct') {
    subType = some.type.structName;
  }
  return normalizeName(`Optional.${subType}`);
};

export const getNestedNamePrefix = (datum: DatumType): string => {
  if (datum.structName !== 'Option') {
    return datum.structName;
  }

  const some = datum.components.find(({ name }) => name === OPTION_SOME);

  if (some) {
    return normalizeName(`Optional.${some.type.type}`);
  }

  if (
    (datum.components[0].name === '__array_element' && datum.components[0].type.type === 'enum') ||
    datum.components[0].type.type === 'struct'
  ) {
    const subType = datum.components[0].type.structName;

    return normalizeName(subType);
  }

  return datum.structName;
};
