import { AbiOutputParameter, AbiParameter } from '../parser/abiParser';
import { SvmOutputType, SvmType, TupleType } from '../parser/parseSvmTypes';

export function generateInputTypes(input: Array<AbiParameter>): string {
  if (input.length === 0) {
    return '';
  }
  return (
    input
      .map((input, index) => `${input.name || `arg${index}`}: ${generateInputType(input.type)}`)
      .join(', ') + ', '
  );
}

// https://docs.ethers.io/ethers.js/html/api-contract.html#types
export function generateInputType(svmType: SvmType): string {
  switch (svmType.type) {
    case 'u8':
    case 'u16':
    case 'u32':
    case 'u64':
      return 'BigNumberish';
    case 'b256':
    case 'address':
      return 'string';
    case 'byte':
      return 'BytesLike';
    case 'array':
      return `[${Array(svmType.size).fill(generateInputType(svmType.itemType)).join(', ')}]`;
    case 'bool':
      return 'boolean';
    case 'string':
      return 'string';
    case 'tuple':
      return generateTupleType(svmType, generateInputType);
    case 'unknown':
      return 'any';
    default:
      return 'any';
  }
}

export function generateOutputType(evmType: SvmOutputType): string {
  switch (evmType.type) {
    case 'u8':
    case 'u16':
      return 'number';
    case 'u32':
    case 'u64':
      return 'BigNumber';
    case 'b256':
    case 'address':
      return 'string';
    case 'byte':
      return 'BytesLike';
    case 'array':
      return `[${Array(evmType.size).fill(generateOutputType(evmType.itemType)).join(', ')}]`;
    case 'bool':
      return 'boolean';
    case 'string':
      return 'string';
    case 'tuple':
      return generateOutputComplexType(evmType.components);
    case 'unknown':
      return 'any';
    case 'void':
      return 'void';
    default:
      return 'any';
  }
}

export function generateTupleType(tuple: TupleType, generator: (evmType: SvmType) => string) {
  return (
    '{' +
    tuple.components
      .map((component) => `${component.name}: ${generator(component.type)}`)
      .join(',') +
    '}'
  );
}

/**
 * Always return an array type; if there are named outputs, merge them to that type
 * this generates slightly better typings fixing: https://github.com/ethereum-ts/TypeChain/issues/232
 **/
export function generateOutputComplexType(components: AbiOutputParameter[]) {
  const existingOutputComponents = [
    generateOutputComplexTypeAsArray(components),
    generateOutputComplexTypesAsObject(components),
  ].filter(Boolean);
  return existingOutputComponents.join(' & ');
}

export function generateOutputComplexTypeAsArray(components: AbiOutputParameter[]): string {
  return `[${components.map((t) => generateOutputType(t.type)).join(', ')}]`;
}

export function generateOutputComplexTypesAsObject(
  components: AbiOutputParameter[]
): string | undefined {
  const namedElements = components.filter((e) => !!e.name);
  if (namedElements.length > 0) {
    return (
      '{' + namedElements.map((t) => `${t.name}: ${generateOutputType(t.type)}`).join(',') + ' }'
    );
  }
}
